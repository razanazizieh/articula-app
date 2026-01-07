export const ApiConfig = {
  BASE_URL: "https://tamkeen-dev.com/api",
  ENDPOINTS: {
    CATEGORY: "/terms/category?_format=json",
    TAGS_LIST: "/terms/tags?_format=json",

    Testimonials: "/testimonials",
    ARTICLE_LIST: "/blogs-api",
    My_ARTICLES: "/blogs-api-current-user",

    Article_Details: (id) => `/node/${id}?_format=json`,
    USER_PROFILE: (userId) => `/user/${userId}?_format=json`,
    Edit_USER_PROFILE: (userId) => `/user/${userId}?_format=json`,
    DELETE_USER: (userId) => `/user/${userId}?_format=json`,

    UPLOAD_USER_IMAGE: "/file/upload/user/user/user_picture?_format=json",
    UPLOAD_GALLERY: "/file/upload/node/blog/field_gallery?_format=json",
    UPLOAD_IMAGE: "/file/upload/node/blog/field_image?_format=json",
    USERS_LIST: "/users-list?_format=json",
    FAQs: "/faq-list",
    HEAR_ABOUT_US: "/terms/hear",
    CONTACT_US_FORM: "/contact-us",

    CSRF_TOKEN: "/session/token",
    CREATE_ARTICLE: "/node?_format=json",
  },
};
