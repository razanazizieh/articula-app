import "./App.css";
import { AuthProvider } from "./Contexts/AuthContext";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import FAQs from "./pages/FAQs.jsx";
import Profile from "./pages/Profile.jsx";
import Jobs from "./pages/Jobs.jsx";
import About from "./pages/About.jsx";
import Articles from "./pages/Articles.jsx";
import UserArticlesManager from "./pages/UserArticlesManager.jsx";
import ArticleDetails from "./components/ArticleDetails.jsx";
import EditProfile from "./components/EditProfile.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetails />} />

          <Route path="*" element={<Page404 />} />

          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userArticlesManager"
            element={
              <ProtectedRoute>
                <UserArticlesManager />
              </ProtectedRoute>
            }
          />

          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
