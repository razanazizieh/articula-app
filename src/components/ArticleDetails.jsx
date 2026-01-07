import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Spinner, Alert, Col } from "react-bootstrap";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { ArticleServices } from "../services/apiServices";
import "../components/css/UserArticlesManager.css";

const ArticleDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "https://tamkeen-dev.com";

  useEffect(() => {
    ArticleServices.getArticleDetails(id)
      .then((data) => setArticle(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <Col className=" text-center py-5">
        <Spinner
          animation="border"
          variant="primary"
          className="custom-loading-spinner"
        />
      </Col>
    );

  if (!article)
    return (
      <Container className="py-5 text-center">
        <Alert variant="light">Article not found</Alert>
      </Container>
    );

  return (
    <div className="articula-view-page">
      <div className="breadcrumbs-bar">
        <div className="breadcrumbs-content">
          <span className="back-link-purple" onClick={() => navigate("/")}>
            Home
          </span>
          {/* <span style={{ color: "#6E7485", margin: "0 8px" }}>/</span>
          <span
            className="back-link-purple"
            onClick={() => navigate("/userArticlesManager")}
          >
            My Articles
          </span> */}
          <span style={{ color: "#6E7485", margin: "0 8px" }}>/</span>
          <span style={{ color: "#1D2026", fontWeight: "500" }}>
            Article Details
          </span>
        </div>
      </div>
      {/* <header className="articula-nav-header">
          <span className="articula-back-action" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Back
          </span>
          <span className="articula-category-tag">{article.category}</span>
        </header> */}
      <div className="articula-container-slim ">
        <section className="articula-title-block">
          <h1 className="articula-main-title">{article.title}</h1>
          <p className="articula-date-text">
            {new Date(article.created).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </section>
        <main className="articula-content-flex">
          <section className="articula-body-wrapper">
            {article.imageUrl && (
              <div className="articula-aspect-banner">
                <img
                  src={
                    article.imageUrl.startsWith("http")
                      ? article.imageUrl
                      : `${BASE_URL}${article.imageUrl}`
                  }
                  alt="Feature"
                  className="articula-banner-img"
                />
              </div>
            )}
            <div
              className="articula-text-content"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />
          </section>

          <aside className="articula-sidebar-gallery">
            {article.gallery && article.gallery.length > 0 && (
              <PhotoProvider>
                <div className="articula-vertical-thumbs">
                  {article.gallery.map((img, index) => {
                    const imgSrc = img.url.startsWith("http")
                      ? img.url
                      : `${BASE_URL}${img.url}`;
                    return (
                      <PhotoView key={index} src={imgSrc}>
                        <div className="articula-square-thumb">
                          <img src={imgSrc} alt="Gallery item" />
                        </div>
                      </PhotoView>
                    );
                  })}
                </div>
              </PhotoProvider>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
};

export default ArticleDetails;
