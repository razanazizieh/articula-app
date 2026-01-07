import { Container, Row, Col, Spinner } from "react-bootstrap";
import "./css/ArticleCategories.css";
import useFetch from "../hooks/useFetch";
import { ArticleServices } from "../services/apiServices";
const ArrowIcon = () => {
  return (
    <svg
      className="arrow-icon-svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 12H3.75"
        stroke="#7E54E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.25L3.75 12L10.5 18.75"
        stroke="#7E54E0"
        strokeWdth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
function CategoryCard({ category }) {
  const CategoryrIcon = () => (
    <svg
      width="85"
      height="85"
      viewBox="0 0 119 119"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M92.4238 22.1816H25.8786C25.3931 22.1816 24.9124 22.2773 24.4638 22.463C24.0153 22.6488 23.6077 22.9211 23.2644 23.2644C22.9211 23.6077 22.6488 24.0153 22.463 24.4638C22.2773 24.9123 22.1816 25.393 22.1816 25.8785V92.4223C22.1816 92.9077 22.2773 93.3885 22.463 93.837C22.6488 94.2855 22.9211 94.6931 23.2644 95.0364C23.6077 95.3797 24.0153 95.652 24.4638 95.8377C24.9124 96.0235 25.3931 96.1191 25.8786 96.1191H92.4238C92.9093 96.1191 93.39 96.0235 93.8386 95.8377C94.2871 95.652 94.6947 95.3797 95.038 95.0364C95.3813 94.6931 95.6536 94.2855 95.8394 93.837C96.0251 93.3885 96.1208 92.9077 96.1208 92.4223V25.8785C96.1208 25.393 96.0251 24.9123 95.8394 24.4638C95.6536 24.0153 95.3813 23.6077 95.038 23.2644C94.6947 22.9211 94.2871 22.6488 93.8386 22.463C93.39 22.2773 92.9093 22.1816 92.4238 22.1816ZM72.0905 72.0895H46.2119V46.2113H72.0905V72.0895Z"
        fill="currentColor"
      />
      <path
        d="M72.0906 46.2109H46.2119V72.0891H72.0906V46.2109Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M92.4238 22.1816H25.8786C23.8368 22.1816 22.1816 23.8368 22.1816 25.8785V92.4223C22.1816 94.464 23.8368 96.1191 25.8786 96.1191H92.4238C94.4656 96.1191 96.1208 94.464 96.1208 92.4223V25.8785C96.1208 23.8368 94.4656 22.1816 92.4238 22.1816Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96.1211 48.0596H107.212"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96.1211 70.2402H107.212"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0908 48.0596H22.1817"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0908 70.2402H22.1817"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.2422 96.1191V107.21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48.0605 96.1191V107.21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.2422 11.0908V22.1814"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M48.0605 11.0908V22.1814"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Col lg={4} md={6} sm={12} className=" category-card-col">
      <div className="category-card-wrapper pt-5 pb-5">
        <div className="category-icon-bg">
          <CategoryrIcon />
        </div>
        <h4 className="category-name mt-3">{category.name}</h4>
        <p className="category-description">
          {category.description ||
            "Discover high-quality articles written by experts and creators."}
        </p>
      </div>
    </Col>
  );
}

const ArticleCategories = () => {
  const {
    data: categoriesData,
    loading,
    error,
  } = useFetch(ArticleServices.getArticleCategories, []);

  const categories = categoriesData || [];

  const renderContent = () => {
    if (loading) {
      return (
        <Col className="text-center py-5">
          <Spinner
            animation="border"
            variant="primary"
            className="custom-loading-spinner"
          />
        </Col>
      );
    }

    if (error) {
      return (
        <Col className="text-center py-5">
          <div className="alert alert-danger">
            No Categories Avaliable : {error}
          </div>
        </Col>
      );
    }

    return categories
      .slice(0, 6)
      .map((category) => (
        <CategoryCard key={category.id} category={category} />
      ));
  };

  return (
    <section className="article-categories-section pt-5">
      <Container>
        <Row className="mb-5 article-categories-row align-items-center">
          <Col  md={12} lg={6}>
            <div
              className="browse-all-header 
            d-flex  justify-content-start"
            >
              <a href="/all-categories" className=" me-2">
                <span className="me-2">
                  <ArrowIcon />
                </span>
                Browse All
              </a>
              <span>
                We have more category & subcategory.
              </span>
            </div>
          </Col>

          <Col  md={12} lg={6}>
            <h2
              className="section-title-cat
             d-flex  justify-content-end text-end mb-0"
            >
              Browse Our Articles&nbsp; <span> Categories</span>
            </h2>
          </Col>
        </Row>

        <Row className="renderContent-row">{renderContent()}</Row>
      </Container>
    </section>
  );
};

export default ArticleCategories;
