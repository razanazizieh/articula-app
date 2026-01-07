import "../components/css/FAQs.css";
import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Accordion from "react-bootstrap/Accordion";
import { ArticleServices } from "../services/apiServices";
import { Container, Row, Col, Spinner } from "react-bootstrap";

const FAQs = () => {
  const [allFaqs, setAllFaqs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFAQsData = () => {
      setIsLoading(true);
      ArticleServices.getFaqList()
        .then((data) => {
          setAllFaqs(Array.isArray(data) ? data : []);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setAllFaqs([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchFAQsData();
  }, []);

  const categoryMap = new Map();
  allFaqs.forEach((faq) => {
    if (faq.category_id && faq.category) {
      categoryMap.set(String(faq.category_id), faq.category);
    }
  });
  const uniqueCategories = Array.from(categoryMap).map(([id, name]) => ({
    id,
    name,
  }));

  const filteredFaqs =
    selectedCategory === "all"
      ? allFaqs
      : allFaqs.filter((faq) => String(faq.category_id) === selectedCategory);

  return (
    <div className="page-container">
      <Navigation />

      <main
        className={`content-wrap container ${
          isLoading || error
            ? "d-flex align-items-center justify-content-center"
            : ""
        }`}
      >
        {isLoading ? (
          <div className="spinner-wrapper">
            <Spinner
              animation="border"
              variant="primary"
              className="custom-loading-spinner"
            />
            {/* <p className="mt-3 text-muted" style={{ fontFamily: 'var(--font-family-roboto)' }}>
              Loading FAQs...
            </p> */}
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center w-100">
            An error occurred while fetching data: {error}
          </div>
        ) : (
          <Row className="w-100 m-0">
            <Col lg={4} className="mb-4">
              <h2 className="faqs-main-title invisible d-none d-lg-block">
                Categories
              </h2>
              <div className="list-group faq-categories-sidebar">
                <label
                  className={`list-group-item ${
                    selectedCategory === "all" ? "active" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                  style={{ cursor: "pointer" }}
                >
                  All Questions
                </label>
                {uniqueCategories.map((cat) => (
                  <label
                    key={cat.id}
                    className={`list-group-item d-flex align-items-center ${
                      String(cat.id) === selectedCategory ? "active" : ""
                    }`}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {cat.name}
                  </label>
                ))}
              </div>
            </Col>

            <Col lg={8} className="ps-lg-4">
              <h2 className="faqs-main-title">FAQs</h2>
              {filteredFaqs.length === 0 ? (
                <p className="alert alert-info">
                  No FAQs in this category yet.
                </p>
              ) : (
                <Accordion defaultActiveKey="0">
                  {filteredFaqs.map((faqItem, index) => (
                    <Accordion.Item
                      eventKey={String(index)}
                      key={faqItem.id || index}
                    >
                      <Accordion.Header>{faqItem.title}</Accordion.Header>
                      <Accordion.Body>
                        <div
                          dangerouslySetInnerHTML={{ __html: faqItem.body }}
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </Col>
          </Row>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;
