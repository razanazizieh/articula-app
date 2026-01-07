import { useState, useEffect, useContext } from "react";
import { ArticleServices } from "../services/apiServices";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";
import { Spinner, Button, Modal } from "react-bootstrap"; 
import "../components/css/Profile.css";

const Profile = () => {
  const { userInfo, handleLogout, setUserInfo } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoadFailed, setImageLoadFailed] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("theUserData"));
    const userId = userInfo?.user_id || savedData?.user_id;
    const token = userInfo?.csrf_token || savedData?.csrf_token;

    if (!userId || !token) {
      setLoading(false);
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    ArticleServices.getUserProfile(userId, token)
      .then((data) => {
        setProfile(data);
        setImageLoadFailed(false);

        const latestImage = data.full_picture_url || data.user_picture?.[0]?.url;
        if (latestImage) {
          setUserInfo((prev) => ({
            ...prev,
            profilePictureUrl: latestImage,
          }));

          const updatedStorage = {
            ...savedData,
            profilePictureUrl: latestImage,
          };
          localStorage.setItem("theUserData", JSON.stringify(updatedStorage));
        }
      })
      .catch((err) => {
        console.error("Error loading profile:", err);
        if (err.message?.includes("401") || err.status === 401) {
          handleLogout();
          navigate("/login", { replace: true });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userInfo?.user_id, userInfo?.csrf_token, setUserInfo, navigate, handleLogout]);

  const handleConfirmDeleteAccount = async () => {
    const currentUserId = userInfo?.user_id || JSON.parse(localStorage.getItem("theUserData"))?.user_id;
    
    setIsDeleting(true);
    ArticleServices.deleteUserAccount(currentUserId)
      .then(() => {
        alert("Account deleted successfully.");
        handleLogout();
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error("Delete account error:", err);
        alert("Failed to delete account. Please try again.");
      })
      .finally(() => {
        setIsDeleting(false);
        setShowDeleteModal(false);
      });
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" className="custom-loading-spinner" />
      </div>
    );

  const firstName = profile?.field_name?.[0]?.value || userInfo?.firstName || "";
  const lastName = profile?.field_surname?.[0]?.value || userInfo?.lastName || "";
  const username = profile?.name?.[0]?.value || userInfo?.username || "";
  const fullName = firstName || lastName ? `${firstName} ${lastName}`.trim() : username || "User";
  const userPictureUrl = profile?.full_picture_url || userInfo?.profilePictureUrl;
  const initials = firstName ? firstName.charAt(0).toUpperCase() : username ? username.charAt(0).toUpperCase() : "U";

  return (
    <div className="profile-page-container">
      <div className="breadcrumbs-bar">
        <div className="breadcrumbs-content">
          <span className="back-link-purple" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            Home
          </span>
          <span style={{ color: "#6E7485", margin: "0 8px" }}>/</span>
          <span style={{ color: "#1D2026", fontWeight: "500" }}>My Account</span>
        </div>
      </div>

      <div className="profile-main-content">
        <div className="profile-header">
          <div className="profile-info-block">
            <div className="profile-avatar">
              {!userPictureUrl || imageLoadFailed ? (
                <div className="avatar-initials-box">{initials}</div>
              ) : (
                <img src={userPictureUrl} alt="Profile" onError={() => setImageLoadFailed(true)} />
              )}
            </div>
            <div className="profile-name-id">
              <h1>{fullName}</h1>
              <p>@{username}</p>
            </div>
          </div>
          <div className="profile-actions-btns">
            <Button onClick={() => navigate("/edit-profile")} className="edit-profile-btn">
              Edit profile
            </Button>
            <Button
              variant="link"
              onClick={() => setShowDeleteModal(true)} // نفتح الـ Modal بدلاً من التنبيه
              className="ms-2 text-danger text-decoration-none"
            >
              Delete Account
            </Button>
          </div>
        </div>

        <div className="info-list">
          <div className="info-item">
            <label className="info-label">Email Address</label>
            <span className="info-value">{profile?.mail?.[0]?.value || userInfo?.email || "—"}</span>
          </div>
          <div className="info-item">
            <label className="info-label">Timezone</label>
            <span className="info-value">{profile?.timezone?.[0]?.value || "Not provided"}</span>
          </div>
          <div className="info-item">
            <label className="info-label">Mobile Number</label>
            <span className="info-value">{profile?.field_mobile?.[0]?.value || "Not provided"}</span>
          </div>
          <div className="info-item">
            <label className="info-label">Member Since</label>
            <span className="info-value">
              {profile?.created?.[0]?.value
                ? new Date(
                    profile.created[0].value.toString().length <= 10
                      ? profile.created[0].value * 1000
                      : profile.created[0].value
                  ).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                : "—"}
            </span>
          </div>
        </div>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
        className="custom-delete-modal"
      >
        <Modal.Header closeButton style={{ border: "none" }}>
          <Modal.Title style={{ fontWeight: "500", color: "#242424" }}>
            Delete Account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: "#6b6b6b", fontSize: "16px" }}>
          Are you sure you want to delete your account, <strong>{fullName}</strong>?
          <br /> 
          <span className="text-danger">This action is permanent and cannot be undone. All your data will be lost.</span>
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
            style={{ 
                backgroundColor: "#cc0000", 
               
                minWidth: "120px" 
            }}
            onClick={handleConfirmDeleteAccount}
            disabled={isDeleting}
          >
            {isDeleting ? <Spinner size="sm" animation="border" /> : "Delete My Account"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;