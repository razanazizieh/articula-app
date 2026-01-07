import { useState, useEffect, useCallback } from "react";
import { ArticleServices } from "../services/apiServices";
import {
  Col,
  Container,
  Spinner,
  Form,
  Row,
  Dropdown,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

import "../components/css/Articles.css";

const BASE_DOMAIN = "https://tamkeen-dev.com";

const DropdownArrow = () => (
  <svg
    width="18"
    height="9"
    viewBox="0 0 24 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17.42 2.45199L18.48 3.51299L12.703 9.29199C12.6104 9.38514 12.5004 9.45907 12.3791 9.50952C12.2579 9.55997 12.1278 9.58594 11.9965 9.58594C11.8652 9.58594 11.7352 9.55997 11.6139 9.50952C11.4927 9.45907 11.3826 9.38514 11.29 9.29199L5.51001 3.51299L6.57001 2.45299L11.995 7.87699L17.42 2.45199Z"
      fill="#7e54e0"
    />
  </svg>
);

const getFullImageUrl = (path) => {
  if (!path) return null;
  const trimmedPath = path.trim();
  if (trimmedPath.startsWith(BASE_DOMAIN) || trimmedPath.startsWith("http"))
    return trimmedPath;
  const normalizedDomain = BASE_DOMAIN.endsWith("/")
    ? BASE_DOMAIN.slice(0, -1)
    : BASE_DOMAIN;
  const normalizedPath = trimmedPath.startsWith("/")
    ? trimmedPath
    : `/${trimmedPath}`;
  return `${normalizedDomain}${normalizedPath}`;
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 600);

  const fetchArticles = useCallback(() => {
    setLoading(true);
    setError(null);

    const filters = {
      limit: itemsPerPage,
      page: currentPage,
      category: selectedCategory,
      search: debouncedSearchTerm,
    };

    ArticleServices.getallArticles(filters)
      .then((response) => {
        if (response && Array.isArray(response.articles)) {
          setArticles(response.articles);
          setTotalPages(response.totalPages || 1);
        } else {
          setArticles([]);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        setError(
          err.message || "Something went wrong while fetching articles."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchTerm, selectedCategory, itemsPerPage, currentPage]);

  useEffect(() => {
    ArticleServices.getArticleCategories()
      .then((data) => {
        setCategories(data.rows || data || []);
      })
      .catch((e) => console.error("Failed to load categories", e));
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div className="page-wrapper">
      <Navigation />
      <Container className="main-content py-5">
        <h2 className="section-title mb-5">Articles ({articles.length})</h2>

        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={(val) => {
            setSearchTerm(val);
            setCurrentPage(0);
          }}
          selectedCategory={selectedCategory}
          setSelectedCategory={(val) => {
            setSelectedCategory(val);
            setCurrentPage(0);
          }}
          categories={categories}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(val) => {
            setItemsPerPage(val);
            setCurrentPage(0);
          }}
        />

        <div className="position-relative min-vh-50">
          {error && (
            <Alert variant="danger" className="square-alert text-center mb-5">
              {error}
            </Alert>
          )}

          {loading && (
            <div className="loading-overlay-custom d-flex justify-content-center align-items-center">
              <Spinner animation="border" className="custom-loading-spinner" />
            </div>
          )}

          <Row className="g-4">
            {articles.map((article) => (
              <Col key={article.id} xl={3} lg={4} md={6} xs={12}>
                <div className="article-card">
                  <div className="image-wrapper">
                    {article.imageUrl ? (
                      <img
                        src={getFullImageUrl(article.imageUrl)}
                        alt={article.title}
                        className="card-image"
                      />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                  <div className="card-body-custom">
                    <h3 className="article-title">
                      {article.title.value || article.title}
                    </h3>
                    <div className="article-meta">
                      {article.author && (
                        <span className="author">{article.author}</span>
                      )}
                      <span className="date">
                        {new Date(
                          article.created.value || article.created
                        ).toLocaleDateString("en-US")}
                      </span>
                    </div>
                    <p className="article-excerpt">
                      {article.body
                        ? `${String(article.body.value || article.body)
                            .replace(/<[^>]*>?/gm, "")
                            .substring(0, 70)}...`
                        : "No content."}
                    </p>
                    <div className="card-footer-custom">
                      <button
                        onClick={() => navigate(`/articles/${article.id}`)}
                        className="view-btn"
                      >
                        VIEW
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {!loading && articles.length === 0 && !error && (
            <p className="text-center py-5">No articles found.</p>
          )}
        </div>

        <CustomPagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Container>
      <Footer />
    </div>
  );
};

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  itemsPerPage,
  setItemsPerPage,
}) => (
  <div className="filter-controls mb-5">
    <Row className="g-3">
      <Col lg={4} md={6}>
        <Form.Control
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="art-minimal-input square-input"
        />
      </Col>
      <Col lg={4} md={6}>
        <Dropdown className="w-100 art-custom-dropdown">
          <Dropdown.Toggle
            variant="none"
            className="art-minimal-input square-input d-flex justify-content-between align-items-center w-100 no-caret"
          >
            <span className="text-truncate">
              {categories.find(
                (c) => String(c.id || c.uuid) === String(selectedCategory)
              )?.name || "All Categories"}
            </span>
            <DropdownArrow />
          </Dropdown.Toggle>
          <Dropdown.Menu className="art-dropdown-menu square-menu w-100">
            <Dropdown.Item onClick={() => setSelectedCategory("")}>
              All Categories
            </Dropdown.Item>
            {categories.map((cat) => (
              <Dropdown.Item
                key={cat.id || cat.uuid}
                onClick={() => setSelectedCategory(cat.id || cat.uuid)}
              >
                {cat.name || cat.label || cat.title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col lg={4} md={12}>
        <Dropdown className="w-100 art-custom-dropdown">
          <Dropdown.Toggle
            variant="none"
            className="art-minimal-input square-input d-flex justify-content-between align-items-center w-100 no-caret"
          >
            <span>Show: {itemsPerPage} Articles</span>
            <DropdownArrow />
          </Dropdown.Toggle>
          <Dropdown.Menu className="art-dropdown-menu square-menu w-100">
            {[10, 20, 50, 100].map((num) => (
              <Dropdown.Item key={num} onClick={() => setItemsPerPage(num)}>
                {num} Articles
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  </div>
);

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);

      let start = Math.max(1, currentPage - 1);
      let end = Math.min(totalPages - 2, currentPage + 1);

      if (start > 1) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 2) pages.push("...");

      pages.push(totalPages - 1);
    }
    return pages;
  };

  return (
    <div className="art-pagination-wrapper">
      <div className="art-pagination-center">
        <button
          className="art-pagi-btn arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ‹
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`art-pagi-btn ${page === currentPage ? "active" : ""} ${
              page === "..." ? "dots" : ""
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
          >
            {typeof page === "number" ? page + 1 : page}
          </button>
        ))}

        <button
          className="art-pagi-btn arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          ›
        </button>
      </div>
    </div>
  );
};
export default Articles;
