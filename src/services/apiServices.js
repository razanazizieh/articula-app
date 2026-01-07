import { ApiConfig } from "../API/ApiConfig";

const TAMKEEN_AUTH_STRING = "dGFta2VlbjoxMjM0NTY=";
const tamkeenHeaders = {
  Authorization: `Basic ${TAMKEEN_AUTH_STRING}`,
  "Content-Type": "application/json",
};
const getUserToken = () => {
  const savedData = localStorage.getItem("theUserData");
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);

      return parsedData.ps;
    } catch (e) {
      console.error("Error parsing user data from localStorage", e);
      return null;
    }
  }
  return null;
};
const isLoggedIn = () => {
  return !!getUserToken();
};

const getUserHeaders = (csrfToken = null) => {
  const token = getUserToken();
  const headers = {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }
  return headers;
};

export const ArticleServices = {
  isLoggedIn,

  getCsrfToken: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CSRF_TOKEN}`;
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error("Could not fetch CSRF token");
      return res.text();
    });
  },

  getArticleCategories: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CATEGORY}`;
    return fetch(url).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch categories: ${res.status}`);
      return res.json();
    });
  },
  getLatestArticles: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.ARTICLE_LIST}`;
    console.log("Fetching Latest Articles using Auth...");
    return fetch(url, {
      method: "GET",
      headers: tamkeenHeaders,
    }).then((res) => {
      if (!res.ok) throw new Error(`Failed to fetch articles: ${res.status}`);
      return res.json().then((data) => data.rows || []);
    });
  },
  getArticleDetails: function (id) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.Article_Details(
      id
    )}`;
    return fetch(url).then((res) => {
      if (!res.ok)
        throw new Error(`Failed to fetch article details: ${res.status}`);
      return res.json().then((rawArticle) => {
        let mainImageUrl = null;
        if (rawArticle.field_image?.length > 0) {
          const path = rawArticle.field_image[0].url;
          mainImageUrl = path.startsWith("http")
            ? path
            : `https://tamkeen-dev.com${path}`;
        }

        const gallery = (rawArticle.field_gallery || []).map((img) => {
          const path = img.url || img.uri;
          return {
            url: path.startsWith("http")
              ? path
              : `https://tamkeen-dev.com${path}`,
            alt: img.alt || "",
          };
        });

        return {
          id: rawArticle.nid[0].value,
          uuid: rawArticle.uuid[0].value,
          title: rawArticle.title[0].value,
          body: rawArticle.body[0].value,
          created: rawArticle.created[0].value,
          imageUrl: mainImageUrl,
          gallery: gallery,
        };
      });
    });
  },

  getFaqList: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.FAQs}`;
    return fetch(url).then((res) => res.json());
  },
  getTestimonials: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.Testimonials}`;
    return fetch(url).then((res) => res.json());
  },
  getArticleTags: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.TAGS_LIST}`;
    return fetch(url).then((res) => res.json());
  },

  createArticle: function (articleData) {
    return this.getCsrfToken().then((csrfToken) => {
      const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.CREATE_ARTICLE}`;
      return fetch(url, {
        method: "POST",
        headers: getUserHeaders(csrfToken),
        body: JSON.stringify(articleData),
      }).then((res) => {
        if (!res.ok)
          throw new Error("Failed to create article. Check permissions.");
        return res.json();
      });
    });
  },
  updateArticle: function (articleId, updatedFields) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.Article_Details(
      articleId
    )}`;

    return this.getCsrfToken().then((csrfToken) => {
      return fetch(url, {
        method: "PATCH",
        headers: {
          ...getUserHeaders(csrfToken),
          "Content-Type": "application/json",
          "X-Reserved-Formatting-Output": "true",
        },
        body: JSON.stringify(updatedFields),
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            console.error("Drupal Error Response:", text);
            throw new Error(text);
          });
        }
        return res.json();
      });
    });
  },
  deleteArticle: function (articleId) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.Article_Details(
      articleId
    )}`;
    return this.getCsrfToken().then((csrfToken) => {
      return fetch(url, {
        method: "DELETE",
        headers: getUserHeaders(csrfToken),
      }).then((res) => {
        if (res.status === 204 || res.ok) return { success: true };
        throw new Error("Failed to delete article.");
      });
    });
  },

  uploadImage: function (imageFile) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.UPLOAD_IMAGE}`;

    return this.getCsrfToken().then((csrfToken) => {
      const headers = getUserHeaders(csrfToken);

      headers["Content-Type"] = "application/octet-stream";
      headers["Content-Disposition"] = `file; filename="${encodeURIComponent(
        imageFile.name
      )}"`;

      return fetch(url, {
        method: "POST",
        headers: headers,
        body: imageFile,
      }).then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Upload failed: ${res.status} - ${text}`);
          });
        }
        return res.json().then((data) => {
          if (data.fid && data.fid[0]) {
            return data.fid[0].value;
          }
          throw new Error("Invalid response format from server");
        });
      });
    });
  },
  uploadGalleryImages: function (files) {
    const selectedFiles = Array.from(files);
    const galleryAPI = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.UPLOAD_GALLERY}`;

    return this.getCsrfToken().then((csrfToken) => {
      const promisedFiles = selectedFiles.map((file) => {
        const headers = {
          "Content-Type": "application/octet-stream",
          "X-CSRF-Token": csrfToken,
          Authorization: `Basic ${getUserToken()}`,
          "Content-Disposition": `file; filename="${file.name}"`,
        };

        return fetch(galleryAPI, {
          method: "POST",
          headers: headers,
          body: file,
        }).then((res) => {
          if (!res.ok) throw new Error("Upload failed");
          return res.json();
        });
      });

      return Promise.all(promisedFiles);
    });
  },

  submitForm: (formData) => {
    const url = ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.CONTACT_US_FORM;
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => res.json());
  },
  getHowDidYouFindUsOptions: () => {
    const url = ApiConfig.BASE_URL + ApiConfig.ENDPOINTS.HEAR_ABOUT_US;
    return fetch(url).then((res) => res.json());
  },

  getallArticles: function (filters = {}) {
    const {
      limit = 10,
      page = 0,
      category = null,
      search = null,
      tag = null,
    } = filters;

    const params = new URLSearchParams();
    params.append("items_per_page", limit);
    params.append("page", page);

    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (tag) params.append("tag", tag);

    const url = `${ApiConfig.BASE_URL}${
      ApiConfig.ENDPOINTS.ARTICLE_LIST
    }?${params.toString()}`;

    return fetch(url, {
      method: "GET",
      headers: getUserHeaders(),
    }).then((res) => {
      return res.json().then((data) => {
        const rawArticles = data.rows || [];
        const pager = data.pager || {};
        const totalPages = Number(pager.total_pages) || 1;

        const normalizedArticles = rawArticles.map((article) => ({
          ...article,
          imageUrl: article.field_image
            ? article.field_image.url || article.field_image
            : null,
        }));

        return {
          articles: normalizedArticles,
          totalPages: totalPages,
          totalItems: Number(pager.total_items) || 0,
          itemsPerPage: Number(pager.items_per_page) || limit,
        };
      });
    });
  },

  getMyArticles: function () {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.My_ARTICLES}`;
    return fetch(url, {
      headers: getUserHeaders(),
    }).then((res) => {
      if (!res.ok)
        throw new Error("Unauthorized or failed to fetch your articles");
      return res.json().then((data) => data.rows || []);
    });
  },

  getCurrentUsrProfile: async function ({ userId, credentials }) {
    const baseUrl = ApiConfig.BASE_URL || "https://tamkeen-dev.com";
    const url = `${baseUrl}/user/${userId}?_format=json`;

    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      const profile = Array.isArray(data) ? data[0] : data;

      console.log("Row data from server :", profile);

      let finalImageUrl = "";

      if (profile?.user_picture && profile.user_picture.length > 0) {
        const path = profile.user_picture[0].url;
        finalImageUrl = path.startsWith("http") ? path : `${baseUrl}${path}`;
      }

      return {
        firstName: profile?.field_name?.[0]?.value || "",
        lastName: profile?.field_surname?.[0]?.value || "",
        email: profile?.mail?.[0]?.value || "",
        profilePictureUrl: finalImageUrl,
      };
    } catch (error) {
      console.error("   while we request the profile: ", error);
      throw error;
    }
  },
  getUserProfile: function (userId, csrfToken) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.USER_PROFILE(
      userId
    )}`;

    return fetch(url, {
      method: "GET",
      headers: {
        ...getUserHeaders(csrfToken),
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const profile = Array.isArray(data) ? data[0] : data;
        if (profile?.user_picture?.[0]?.url) {
          profile.full_picture_url = profile.user_picture[0].url;
        }
        return profile;
      });
  },

  updateUserProfile: function (userId, updatedData) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.Edit_USER_PROFILE(
      userId
    )}`;

    return this.getCsrfToken().then((csrfToken) => {
      return fetch(url, {
        method: "PATCH",
        headers: getUserHeaders(csrfToken),
        body: JSON.stringify(updatedData),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to update profile.");
        return res.json();
      });
    });
  },
  deleteUserAccount: function (userId) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.DELETE_USER(
      userId
    )}`;

    return this.getCsrfToken().then((csrfToken) => {
      return fetch(url, {
        method: "DELETE",
        headers: getUserHeaders(csrfToken),
      }).then((res) => {
        if (res.ok || res.status === 204) return { success: true };
        throw new Error("Failed to delete account");
      });
    });
  },

  uploadUserPicture: function (imageFile) {
    const url = `${ApiConfig.BASE_URL}${ApiConfig.ENDPOINTS.UPLOAD_USER_IMAGE}`;

    return this.getCsrfToken().then((csrfToken) => {
      const headers = getUserHeaders(csrfToken);
      headers["Content-Type"] = "application/octet-stream";
      headers["Content-Disposition"] = `file; filename="${imageFile.name}"`;

      return fetch(url, {
        method: "POST",
        headers: headers,
        body: imageFile,
      }).then((res) => {
        if (!res.ok) throw new Error("Failed to upload profile picture");
        return res.json().then((data) => data.fid[0].value);
      });
    });
  },

  getUsersList: function (filters = {}) {
    const searchQuery = filters.search ? `&name=${filters.search}` : "";
    const url = `${ApiConfig.BASE_URL}/users-list?_format=json&page=${
      filters.page || 0
    }${searchQuery}`;

    return fetch(url, { headers: tamkeenHeaders })
      .then((res) => {
        if (!res.ok) throw new Error("Connection Error");
        return res.json();
      })
      .then((data) => {
        const rows = data.rows || [];
        return {
          users: rows.map((user) => {
            let userImage = null;
            if (user.user_picture) {
              const match = user.user_picture.match(/src="([^"]+)"/);
              if (match) {
                userImage = match[1].replace(/&amp;/g, "&");
                if (
                  userImage.startsWith("/") &&
                  !userImage.startsWith("http")
                ) {
                  userImage = `https://tamkeen-dev.com${userImage}`;
                }
              }
            }
            let cleanDate = "N/A";
            if (user.created) {
              const raw = user.created.replace(/<[^>]*>?/gm, "");
              const datePart = raw.split("-")[0];
              if (datePart.includes(",")) {
                cleanDate = datePart.split(",")[1].trim();
              }
            }

            return {
              ...user,
              userImage,
              fullName:
                `${user.field_name || ""} ${user.field_surname || ""}`.trim() ||
                user.name,
              displayDate: cleanDate,
            };
          }),
          pager: data.pager,
          genderStats: {
            male: rows.filter((u) => u.field_gender === "Male").length,
            female: rows.filter((u) => u.field_gender === "Female").length,
            notSpecified: rows.filter(
              (u) => !["Male", "Female"].includes(u.field_gender)
            ).length,
          },
        };
      });
  },
};
