import React, { useState, useEffect } from "react";
import { ArticleServices } from "../services/apiServices";
import { Spinner, Container, Alert, Dropdown } from "react-bootstrap";
import "../components/css/UserArticlesManager.css";
const DropdownArrow = () => {
  return (
    <svg
      width="24"
      height="12"
      viewBox="0 0 24 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.42 2.45199L18.48 3.51299L12.703 9.29199C12.6104 9.38514 12.5004 9.45907 12.3791 9.50952C12.2579 9.55997 12.1278 9.58594 11.9965 9.58594C11.8652 9.58594 11.7352 9.55997 11.6139 9.50952C11.4927 9.45907 11.3826 9.38514 11.29 9.29199L5.51001 3.51299L6.57001 2.45299L11.995 7.87699L17.42 2.45199Z"
        fill=" #7c59de"
      />
    </svg>
  );
};

const EditArticleForm = ({ articleId, onUpdateSuccess }) => {
  const [articleData, setArticleData] = useState({
    title: [{ value: "" }],
    body: [{ value: "", format: "full_html" }],
    field_category: [{ target_id: "" }],
    field_tags: [],
    field_image: [],
    field_gallery: [],
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [loading, setLoading] = useState({
    page: true,
    submit: false,
    banner: false,
    gallery: false,
  });
  const [error, setError] = useState(null);

  const BASE_URL = "https://tamkeen-dev.com";

  useEffect(() => {
    setLoading((prev) => ({ ...prev, page: true }));
    setError(null);

    const rawData = localStorage.getItem("theUserData");
    let userToken = "";
    if (rawData) {
      try {
        const parsedData = JSON.parse(rawData);
        userToken = parsedData?.ps || "";
      } catch (e) {
        console.error("Error parsing user data from localStorage", e);
      }
    }

    Promise.all([
      ArticleServices.getArticleCategories(),
      ArticleServices.getArticleTags(),
      fetch(`${BASE_URL}/api/node/${articleId}?_format=json`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: userToken ? `Basic ${userToken}` : "",
        },
      }).then((res) => {
        if (!res.ok) throw new Error("Unauthorized or Article not found");
        return res.json();
      }),
    ])
      .then(([catsData, tagsData, rawArticle]) => {
        setCategories(catsData || []);
        setTags(tagsData?.rows || tagsData || []);

        if (rawArticle.field_image?.length > 0) {
          const imgPath = rawArticle.field_image[0].url;
          setBannerPreview(
            imgPath.startsWith("http") ? imgPath : `${BASE_URL}${imgPath}`
          );
        }

        const gPreviews = (rawArticle.field_gallery || []).map((img) => ({
          url: img.url.startsWith("http") ? img.url : `${BASE_URL}${img.url}`,
          target_id: img.target_id,
        }));
        setGalleryPreviews(gPreviews);

        setArticleData({
          title: [{ value: rawArticle.title[0]?.value || "" }],
          body: [
            { value: rawArticle.body[0]?.value || "", format: "full_html" },
          ],
          field_category: rawArticle.field_category?.[0]?.target_id
            ? [{ target_id: Number(rawArticle.field_category[0].target_id) }]
            : [],
          field_tags: (rawArticle.field_tags || []).map((t) => ({
            target_id: Number(t.target_id),
          })),
          field_image: rawArticle.field_image?.[0]?.target_id
            ? [{ target_id: Number(rawArticle.field_image[0].target_id) }]
            : [],
          field_gallery: gPreviews.map((g) => ({
            target_id: Number(g.target_id),
          })),
        });
      })
      .catch((err) => {
        console.error("Error loading article:", err);
        setError("Failed to load article data.");
      })
      .finally(() => setLoading((prev) => ({ ...prev, page: false })));
  }, [articleId]);

  const handleFileUpload = (e, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading((prev) => ({ ...prev, [type]: true }));

    if (type === "banner") {
      setBannerPreview(URL.createObjectURL(files[0]));
      ArticleServices.uploadImage(files[0])
        .then((fid) =>
          setArticleData((p) => ({ ...p, field_image: [{ target_id: fid }] }))
        )
        .catch(() => setError("Failed to upload cover image"))
        .finally(() => setLoading((prev) => ({ ...prev, banner: false })));
    } else {
      const localFiles = Array.from(files);
      setGalleryPreviews((prev) => [
        ...prev,
        ...localFiles.map((f) => ({ url: URL.createObjectURL(f) })),
      ]);
      ArticleServices.uploadGalleryImages(localFiles)
        .then((results) => {
          const newIds = results.map((item) => ({
            target_id: item.fid[0].value,
          }));
          setArticleData((p) => ({
            ...p,
            field_gallery: [...p.field_gallery, ...newIds],
          }));
        })
        .catch(() => setError("Failed to upload gallery images"))
        .finally(() => setLoading((prev) => ({ ...prev, gallery: false })));
    }
  };

  const handleUpdate = () => {
    setLoading((prev) => ({ ...prev, submit: true }));
    setError(null);

    const payload = {
      type: [{ target_id: "blog" }],
      title: articleData.title,
      body: articleData.body,
      field_category: articleData.field_category,
      field_tags: articleData.field_tags,
      field_image: articleData.field_image,
      field_gallery: articleData.field_gallery,
    };

    ArticleServices.updateArticle(articleId, payload)
      .then(() => onUpdateSuccess(articleId))
      .catch((err) => {
        console.error("Update Error:", err);
        setError("Failed to save changes. Please try again.");
      })
      .finally(() => setLoading((prev) => ({ ...prev, submit: false })));
  };

  if (loading.page)
    return (
      <div className="text-center py-5">
        <Spinner
          animation="border"
          variant="primary"
          className="custom-loading-spinner"
        />
      </div>
    );

  return (
    <div className="edit-article-wrapper">
      <Container className="edit-form-inner-container">
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}

        <div className="mb-5">
          <label className="edit-field-label">Article Title</label>
          <input
            type="text"
            className="edit-minimal-input"
            value={articleData.title[0].value}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                title: [{ value: e.target.value }],
              })
            }
          />
        </div>

        <div className="mb-5">
          <label className="edit-field-label">Category</label>
          <Dropdown className="w-100 category-dropdown-container">
            <Dropdown.Toggle
              variant="none"
              className="edit-minimal-input d-flex justify-content-between align-items-center w-100"
            >
              <span>
                {categories.find(
                  (c) =>
                    Number(c.id) === articleData.field_category[0]?.target_id
                )?.name || "Choose a topic"}
              </span>
              <DropdownArrow />
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-dropdown w-100">
              {categories.map((cat) => (
                <Dropdown.Item
                  key={cat.id}
                  className="user-dropdown-item py-2"
                  onClick={() =>
                    setArticleData({
                      ...articleData,
                      field_category: [{ target_id: Number(cat.id) }],
                    })
                  }
                >
                  {cat.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="mb-5">
          <label className="edit-field-label">Body Content</label>
          <textarea
            className="edit-minimal-input edit-body-textarea"
            value={articleData.body[0].value}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                body: [{ value: e.target.value, format: "full_html" }],
              })
            }
          />
        </div>


        <div className="mb-5">
          <div className="d-flex gap-4 mb-4">
            <label
              className="edit-media-upload-btn"
              style={{ cursor: "pointer" }}
            >
              <input
                type="file"
                className="d-none"
                onChange={(e) => handleFileUpload(e, "banner")}
              />
              {loading.banner ? <Spinner size="sm" /> : "+ Change Cover"}
            </label>
            <label
              className="edit-media-upload-btn"
              style={{ cursor: "pointer" }}
            >
              <input
                type="file"
                multiple
                className="d-none"
                onChange={(e) => handleFileUpload(e, "gallery")}
              />
              {loading.gallery ? <Spinner size="sm" /> : "+ Edit Gallery"}
            </label>
          </div>

          {bannerPreview && (
            <div className="mb-4">
              <p className="edit-preview-label">COVER PREVIEW</p>
              <div className="position-relative d-inline-block">
                <img
                  src={bannerPreview}
                  alt="Cover"
                  className="edit-preview-banner-img"
                />
                <button
                  className="edit-remove-img-btn"
                  onClick={() => {
                    setBannerPreview(null);
                    setArticleData((p) => ({ ...p, field_image: [] }));
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div className="d-flex flex-wrap gap-2">
            {galleryPreviews.map((img, i) => (
              <div key={i} className="position-relative">
                <img
                  src={img.url}
                  alt="Gallery"
                  className="edit-preview-gallery-img"
                />
                <button
                  className="edit-remove-img-btn edit-sm-remove"
                  onClick={() => {
                    setGalleryPreviews((p) => p.filter((_, idx) => idx !== i));
                    setArticleData((p) => ({
                      ...p,
                      field_gallery: p.field_gallery.filter(
                        (_, idx) => idx !== i
                      ),
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5">
          <label className="edit-field-label">Tags</label>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = articleData.field_tags.some(
                (t) => Number(t.target_id) === Number(tag.id)
              );
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    const newTags = selected
                      ? articleData.field_tags.filter(
                          (t) => Number(t.target_id) !== Number(tag.id)
                        )
                      : [
                          ...articleData.field_tags,
                          { target_id: Number(tag.id) },
                        ];
                    setArticleData({ ...articleData, field_tags: newTags });
                  }}
                  className={`edit-tag-capsule ${selected ? "selected" : ""}`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        <footer className="edit-footer-actions">
          <button
            className="edit-btn-save"
            onClick={handleUpdate}
            disabled={loading.submit}
          >
            {loading.submit ? <Spinner size="sm" /> : "Save Changes"}
          </button>
          <button
            className="edit-btn-cancel"
            type="button"
            onClick={() => onUpdateSuccess(null)}
          >
            Cancel
          </button>
        </footer>
      </Container>
    </div>
  );
};

export default EditArticleForm;
