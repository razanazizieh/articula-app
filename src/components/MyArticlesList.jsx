import { useState, useEffect } from "react";
import { ArticleServices } from "../services/apiServices";
import { Spinner, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditArticleForm from "./EditArticleForm";

const BASE_DOMAIN = "https://tamkeen-dev.com";

const MyArticlesList = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticleId, setEditingArticleId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchMyArticles();
  }, []);

  const fetchMyArticles = () => {
    setLoading(true);
    ArticleServices.getMyArticles()
      .then((data) => setArticles(Array.isArray(data) ? data : []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const openDeleteModal = (article) => {
    setSelectedArticle(article);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedArticle) return;
    setIsDeleting(true);
    ArticleServices.deleteArticle(selectedArticle.id)
      .then(() => {
        fetchMyArticles();
        setShowDeleteModal(false);
      })
      .catch((err) => alert("Error deleting: " + err.message))
      .finally(() => setIsDeleting(false));
  };

  const getSnippet = (article) => {
    const content = article.body?.value || article.body || "";
    return (
      content
        .toString()
        .replace(/<[^>]*>?/gm, "")
        .substring(0, 100) + "..."
    );
  };

  if (editingArticleId)
    return (
      <div className="edit-container">
        <EditArticleForm
          articleId={editingArticleId}
          onUpdateSuccess={(val) => {
            setEditingArticleId(null);
            if (val !== null) fetchMyArticles();
          }}
        />
      </div>
    );

  if (loading)
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
    <div className="articles-list-container">
      {error && <Alert variant="danger">{error}</Alert>}

      {articles.length === 0 && !loading && (
        <p className="text-muted text-center py-4">No articles found.</p>
      )}

      {articles.map((article) => {
        const imagePath = article.field_image;
        const fullImageUrl = imagePath
          ? `${BASE_DOMAIN}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`
          : null;

        return (
          <div key={article.id} className="article-item-card">
            <div className="article-content-box">
              <div className="article-date-meta">
                {new Date(
                  article.created?.value || article.created
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <h4 className="article-item-title">
                {article.title?.value || article.title}
              </h4>
              <p className="article-item-snippet">{getSnippet(article)}</p>

              <div className="article-actions-group">
                <button
                  className="action-link"
                  onClick={() => setEditingArticleId(article.id)}
                >
                  Edit
                </button>
                <button
                  className="action-link"
                  onClick={() => navigate(`/articles/${article.id}`)}
                >
                  View
                </button>
                <button
                  className="action-link delete"
                  onClick={() => openDeleteModal(article)}
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="article-image-box">
              {imagePath ? (
                <img src={fullImageUrl} alt="Article" />
              ) : (
                <div className="placeholder-box">No Image</div>
              )}
            </div>
          </div>
        );
      })}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="custom-delete-modal"
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title style={{ fontWeight: "500", color: "#242424" }}>
            Delete Article
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#6b6b6b", fontSize: "16px" }}>
          Are you sure you want to delete the article
          <strong>
            "{selectedArticle?.title?.value || selectedArticle?.title}"
          </strong>
          ?
          <br /> This action cannot be undone.
        </Modal.Body>
        <Modal.Footer style={{ border: "none", padding: "20px" }}>
          <button
            className="btn-cancel"
            onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn-save"
            style={{ backgroundColor: "#cc0000", minWidth: "120px" }}
            onClick={handleConfirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Spinner size="sm" animation="border" />
            ) : (
              "Delete Now"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyArticlesList;
