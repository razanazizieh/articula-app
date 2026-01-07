import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Spinner, Alert } from "react-bootstrap";
import { ArticleServices } from "../services/apiServices";
import { AuthContext } from "../Contexts/AuthContext";
import "../components/css/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();
  const { updateUserInfo, userInfo } = useContext(AuthContext);

  const userId =
    userInfo?.user_id ||
    JSON.parse(localStorage.getItem("theUserData"))?.user_id;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    currentPicture: "",
    newPictureFile: null,
  });

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    ArticleServices.getCsrfToken()
      .then((token) => ArticleServices.getUserProfile(userId, token))
      .then((data) => {
        const profileData = Array.isArray(data) ? data[0] : data;
        
        setFormData({
          firstName: profileData.field_name?.[0]?.value || "",
          lastName: profileData.field_surname?.[0]?.value || "",
          username: profileData.name?.[0]?.value || "",
          email: profileData.mail?.[0]?.value || "",
          mobile: profileData.field_mobile?.[0]?.value || "",
          currentPicture: profileData.full_picture_url || "",
          newPictureFile: null,
        });
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setStatus({ type: "danger", message: "Failed to load profile data." });
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus({ type: "", message: "" });

    try {
      let pictureFid = null;

      if (formData.newPictureFile) {
        pictureFid = await ArticleServices.uploadUserPicture(
          formData.newPictureFile
        );
      }

      const payload = {
        field_name: [{ value: formData.firstName }],
        field_surname: [{ value: formData.lastName }],
        mail: [{ value: formData.email }],
        field_mobile: [{ value: formData.mobile }],
      };

      if (pictureFid) {
        payload.user_picture = [{ target_id: pictureFid }];
      }

      const response = await ArticleServices.updateUserProfile(userId, payload);

      const savedData = JSON.parse(localStorage.getItem("theUserData"));
      
      const updatedUser = {
        ...savedData,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        profilePictureUrl: response.full_picture_url || formData.currentPicture,
      };

      updateUserInfo(updatedUser);

      setStatus({ type: "success", message: "Profile updated successfully!" });
      
      setTimeout(() => navigate("/my-account"), 1500);
    } catch (err) {
      console.error("Save error:", err);
      setStatus({
        type: "danger",
        message: err.message || "An error occurred while saving.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner
          animation="border"
          variant="primary"
          className="custom-loading-spinner"
        />
      </div>
    );

  return (
    <div className="edit-profile-container">
      <div className="breadcrumbs-bar">
        <div className="breadcrumbs-content">
          <span className="back-link-purple" onClick={() => navigate("/")} style={{cursor: 'pointer'}}>
           Home
          </span>
          <span style={{ color: "#6E7485", margin: "0 5px" }}>/</span>
          <span style={{ color: "#1D2026" }}>Edit Profile</span>
        </div>
      </div>

      <div className="edit-main-content">
        <form onSubmit={handleSubmit}>
          <h1 className="edit-title">Edit Profile</h1>

          {status.message && (
            <Alert variant={status.type} className="mb-4" dismissible onClose={() => setStatus({type:'', message:''})}>
              {status.message}
            </Alert>
          )}

          <div className="photo-upload-section">
            <div className="avatar-wrapper">
              <img
                src={
                  formData.newPictureFile
                    ? URL.createObjectURL(formData.newPictureFile)
                    : formData.currentPicture || "/default-avatar.png"
                }
                className="preview-avatar"
                alt="Profile Preview"
                key={
                  formData.newPictureFile
                    ? formData.newPictureFile.name
                    : formData.currentPicture
                }
                onError={(e) => { e.target.src = "/default-avatar.png"; }}
              />
            </div>
            <div className="upload-controls">
              <label className="media-upload-btn" style={{cursor: 'pointer'}}>
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newPictureFile: e.target.files[0],
                    })
                  }
                />
                + Change Photo
              </label>
            </div>
          </div>

          <div className="form-grid">
            <div className="input-wrapper">
              <label className="input-label">First Name</label>
              <input
                className="styled-input"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="input-wrapper">
              <label className="input-label">Last Name</label>
              <input
                className="styled-input"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-wrapper">
            <label className="input-label">Username (Read Only)</label>
            <input
              className="styled-input read-only-input"
              value={formData.username}
              readOnly
              style={{ backgroundColor: '#f4f4f4', cursor: 'not-allowed' }}
            />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Email Address</label>
            <input
              className="styled-input"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="input-wrapper">
            <label className="input-label">Mobile Number</label>
            <input
              className="styled-input"
              type="text"
              value={formData.mobile}
              onChange={(e) =>
                setFormData({ ...formData, mobile: e.target.value })
              }
            />
          </div>

          <div className="edit-actions">
            <Button
              variant="light"
              className="cancel-btn"
              onClick={() => navigate(-1)}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" className="save-btn" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  {/* Saving... */}
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;