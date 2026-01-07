import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import useFetch from "../hooks/useFetch";
import { ArticleServices } from "../services/apiServices";
import "./css/LatestArticles.css";
import ViewMoreButton from "./ViewMoreButton";

const Feather = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 42 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40.2361 42.4477C40.2361 42.4477 20.1807 30.7331 8.41656 9.24219"
        stroke="#6341AF"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.6527 38.651C13.0335 43.8395 11.373 27.1445 11.373 27.1445"
        stroke="#6341AF"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25.7022 27.3671C25.1476 20.2324 27.8003 16.7775 27.8003 16.7775C36.5618 26.3513 35.3716 36.0881 34.6527 38.652M22.2169 32.2643C17.275 31.0598 12.7217 28.6155 8.98694 25.1621C0.981435 17.8046 0.987061 7.07214 0.823936 2.77239C0.814715 2.48905 0.869428 2.20727 0.984015 1.94797C1.0986 1.68867 1.27012 1.4585 1.48583 1.27456C1.70155 1.09062 1.95592 0.957624 2.23007 0.885448C2.50422 0.813272 2.79111 0.803769 3.06944 0.857644C19.9163 4.18089 25.6257 21.5183 25.6257 21.5183"
        stroke="#6341AF"
        strokeWidth="1.64583"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ArticleCard = ({ article }) => {
  const BASE_URL = "https://tamkeen-dev.com";

  return (
    <Col
      xl={3}
      lg={4}
      md={6}
      xs={12}
      className="mb-4 d-flex align-items-stretch justify-content-start"
    >
      <Card className="article-card-wrapper w-100   h-100 p-3">
        <div className="article-image-container">
          <Card.Img
            variant="top"
            src={
              article.field_image
                ? `${BASE_URL}${article.field_image}`
                : "https://via.placeholder.com/300x200?text=Article+Image"
            }
            alt={article.title}
            className="article-image"
          />
        </div>
        <div className="mt-3">
          <span className="article-tag">
            {article.field_tags && article.field_tags.length > 0
              ? article.field_tags[0]
              : "Science"}
          </span>
        </div>
        <Card.Body className="article-card-body">
          <Card.Title className="article-title pb-3">
            {article.title ||
              "2021 Complete Python Bootcamp From Zero to Hero..."}
                   
          </Card.Title>
          <Card.Text className="article-author pt-2">
            <Feather /> {article.author || "Alex Max"}       
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

const LatestArticles = () => {
  const {
    data: articlesData,
    loading,
    error,
  } = useFetch(ArticleServices.getLatestArticles, []);

  const articles = articlesData || [];

  const renderContent = () => {
    if (loading)
      return (
        <Col className="text-center py-5">
          <Spinner
            animation="border"
            variant="primary"
            className="custom-loading-spinner"
          />
               
        </Col>
      );

    if (error)
      return (
        <Col className="text-center py-5">
          <div className="alert alert-danger">
            Error fetching articles: {error.message}       
          </div>
        </Col>
      );

    if (articles.length === 0)
      return (
        <Col className="text-center py-5">
          <p>No articles found yet.</p>       
        </Col>
      );

    return articles
      .slice(0, 4)
      .map((article) => <ArticleCard key={article.id} article={article} />);
  };

  return (
    <section className="latest-articles-section  pt-5 pb-2 position-relative">
           
      <Container>
        <Row className="my-5 justify-content-start">{renderContent()}</Row>   
        <ViewMoreButton left="85%" path="/articles" />
      </Container>
    </section>
  );
};

export default LatestArticles;
