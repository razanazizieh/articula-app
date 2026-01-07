import { useState, useEffect } from "react";
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

const CreateArticleForm = ({ onCancel, onSuccess }) => {
  const [articleData, setArticleData] = useState({
    type: [{ target_id: "blog" }],
    title: [{ value: "" }],
    body: [{ value: "", format: "basic_html" }],
    field_image: [],
    field_gallery: [],
    field_tags: [],
    field_category: [{ target_id: "" }],
  });

  const [bannerPreview, setBannerPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState({
    form: false,
    banner: false,
    gallery: false,
  });

  useEffect(() => {
    ArticleServices.getArticleCategories()
      .then((data) => setCategories(data || []))
      .catch((err) => console.error("Error fetching categories:", err));

    ArticleServices.getArticleTags()
      .then((data) => setTags(data || []))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  const handlePublish = () => {
    if (
      !articleData.title[0].value.trim() ||
      !articleData.field_category[0].target_id
    ) {
      setError("Please fill in the title and category.");
      return;
    }

    setLoading((prev) => ({ ...prev, form: true }));
    setError(null);

    ArticleServices.createArticle(articleData)
      .then((res) => {
        if (res) {
          if (onSuccess) onSuccess();
          onCancel();
        }
      })
      .catch((err) => {
        console.error("Publish Error:", err);
        setError("Failed to publish article. Please check your connection.");
      })
      .finally(() => setLoading((prev) => ({ ...prev, form: false })));
  };

  const handleFilesUpload = (e, type) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setLoading((prev) => ({ ...prev, [type]: true }));
    setError(null);

    if (type === "banner") {
      setBannerPreview(URL.createObjectURL(files[0]));
      ArticleServices.uploadImage(files[0])
        .then((fid) =>
          setArticleData((prev) => ({
            ...prev,
            field_image: [{ target_id: fid }],
          }))
        )
        .catch(() => setError("Failed to upload cover image."))
        .finally(() => setLoading((prev) => ({ ...prev, banner: false })));
    } else if (type === "gallery") {
      const localFiles = Array.from(files);
      setGalleryPreviews((prev) => [
        ...prev,
        ...localFiles.map((f) => ({
          url: URL.createObjectURL(f),
          isUploading: true,
        })),
      ]);

      ArticleServices.uploadGalleryImages(localFiles)
        .then((results) => {
          const newIds = results.map((item) => ({
            target_id: item.fid[0].value,
          }));
          setArticleData((prev) => ({
            ...prev,
            field_gallery: [...prev.field_gallery, ...newIds],
          }));
        })
        .catch(() => setError("Failed to upload gallery images."))
        .finally(() => setLoading((prev) => ({ ...prev, gallery: false })));
    }
  };

  return (
    <div className="create-article-wrapper">
      <Container className="form-inner-container">
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div className="mb-5">
          <label className="field-label">Article Title</label>
          <input
            type="text"
            placeholder="Type your headline here..."
            className="form-control minimal-input"
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
          <label className="field-label">Category</label>
          <Dropdown className="w-100 category-dropdown-container">
            <Dropdown.Toggle
              variant="none"
              className="minimal-input d-flex justify-content-between align-items-center w-100 shadow-none"
            >
              <span>
                {categories.find(
                  (c) =>
                    String(c.id) ===
                    String(articleData.field_category[0].target_id)
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
                      field_category: [{ target_id: cat.id }],
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
          <label className="field-label">Body Content</label>
          <textarea
            placeholder="Write your article content..."
            className="form-control minimal-input body-textarea"
            value={articleData.body[0].value}
            onChange={(e) =>
              setArticleData({
                ...articleData,
                body: [{ value: e.target.value, format: "basic_html" }],
              })
            }
          />
        </div>

        <div className="mb-5">
          <div className="d-flex gap-4 mb-4">
            <label className="media-upload-btn" style={{ cursor: "pointer" }}>
              <input
                type="file"
                className="d-none"
                accept="image/*"
                onChange={(e) => handleFilesUpload(e, "banner")}
              />
              {loading.banner ? <Spinner size="sm" /> : "+ Main Cover"}
            </label>
            <label className="media-upload-btn" style={{ cursor: "pointer" }}>
              <input
                type="file"
                multiple
                accept="image/*"
                className="d-none"
                onChange={(e) => handleFilesUpload(e, "gallery")}
              />
              {loading.gallery ? <Spinner size="sm" /> : "+ Gallery Photos"}
            </label>
          </div>

          {bannerPreview && (
            <div className="mb-4">
              <p className="preview-label">COVER PREVIEW</p>
              <div className="position-relative d-inline-block">
                <img
                  src={bannerPreview}
                  alt="Cover"
                  className="preview-banner-img"
                />
                <button
                  type="button"
                  className="remove-img-btn"
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
                  className="preview-gallery-img"
                />
                <button
                  type="button"
                  className="remove-img-btn sm-remove"
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
          <label className="field-label tag-label">Tags</label>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag) => {
              const selected = articleData.field_tags.some(
                (t) => t.target_id === tag.id
              );
              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    const newTags = selected
                      ? articleData.field_tags.filter(
                          (t) => t.target_id !== tag.id
                        )
                      : [...articleData.field_tags, { target_id: tag.id }];
                    setArticleData({ ...articleData, field_tags: newTags });
                  }}
                  className={`tag-capsule ${selected ? "selected" : ""}`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        <footer className="footer-actions">
          <button
            className="btn-publish"
            onClick={handlePublish}
            disabled={loading.form || loading.banner || loading.gallery}
          >
            {loading.form ? <Spinner size="sm" /> : "Publish"}
          </button>
          <button type="button" className="btn-discard" onClick={onCancel}>
            Discard
          </button>
        </footer>
      </Container>
    </div>
  );
};

export default CreateArticleForm;
