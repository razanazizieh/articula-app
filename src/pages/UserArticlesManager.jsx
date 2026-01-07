import { useState } from "react";
import CreateArticleForm from "../components/CreateArticleForm";
import MyArticlesList from "../components/MyArticlesList";
import { useNavigate } from "react-router-dom";
import "../components/css/UserArticlesManager.css";

const UserArticlesManager = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="manager-wrapper">
      <div className="breadcrumbs-bar">
        <div className="breadcrumbs-content">
          <span
            className="back-link-purple"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            Home
          </span>
          <span style={{ color: "#6E7485", margin: "0 1px" }}>/</span>
          <span style={{ color: "#1D2026" }}>My Articles</span>
        </div>
      </div>

      <div className="main-content">
        <h1 className="title-section">Manage Articles</h1>

        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === "list" ? "active" : ""}`}
            onClick={() => setActiveTab("list")}
          >
            Published Articles
          </button>
          <button
            className={`tab-btn ${activeTab === "create" ? "active" : ""}`}
            onClick={() => setActiveTab("create")}
          >
            Create New Article
          </button>
        </div>

        <div className="tab-content-area">
          {activeTab === "list" && <MyArticlesList />}
          {activeTab === "create" && (
            <CreateArticleForm onCancel={() => setActiveTab("list")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserArticlesManager;
