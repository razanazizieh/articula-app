import { useState, useEffect } from "react";
import { ArticleServices } from "../services/apiServices";
import "./css/ContactUsForm.css";
import mapimg from "/mapp.png";
import { Col, Row } from "react-bootstrap";

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.4715 0V1.92844C17.3789 1.92844 19.1658 2.41055 20.8323 3.37476C22.4184 4.3189 23.6833 5.58443 24.6269 7.17137C25.5907 8.83867 26.0725 10.6265 26.0725 12.5348H28C28 10.2649 27.4278 8.15568 26.2834 6.20716C25.1791 4.3189 23.6833 2.82235 21.796 1.71751C19.8485 0.572505 17.7403 0 15.4715 0ZM5.50296 2.89266C4.96086 2.89266 4.48903 3.0634 4.08748 3.4049L0.98548 6.56874L1.07583 6.50847C0.573887 6.93032 0.242605 7.45261 0.0819839 8.07533C-0.0585599 8.69805 -0.0184045 9.30069 0.20245 9.88324C0.764625 11.4501 1.51754 13.0571 2.46119 14.7043C3.78632 16.9743 5.36241 19.0132 7.18948 20.8211C10.1208 23.774 13.7649 26.1042 18.1218 27.8117H18.1519C18.7341 28.0126 19.3164 28.0527 19.8987 27.9322C20.501 27.8117 21.033 27.5505 21.4948 27.1488L24.5366 24.1055C24.9382 23.7037 25.1389 23.2116 25.1389 22.629C25.1389 22.0264 24.9382 21.5242 24.5366 21.1224L20.5913 17.145C20.1898 16.7433 19.6878 16.5424 19.0855 16.5424C18.4832 16.5424 17.9812 16.7433 17.5797 17.145L15.6823 19.0734C14.1564 18.3503 12.8313 17.4564 11.707 16.3917C10.5826 15.307 9.68915 13.9912 9.02659 12.4444L10.954 10.516C11.3757 10.0741 11.5865 9.55179 11.5865 8.94915C11.5865 8.32643 11.3456 7.82423 10.8637 7.44256L10.954 7.53296L6.91843 3.4049C6.51688 3.0634 6.04506 2.89266 5.50296 2.89266ZM15.4715 3.85687V5.78531C16.6963 5.78531 17.8206 6.08663 18.8446 6.68927C19.8886 7.2919 20.7118 8.11551 21.3141 9.16008C21.9165 10.1846 22.2176 11.3095 22.2176 12.5348H24.1451C24.1451 10.968 23.7536 9.51161 22.9705 8.16572C22.1875 6.86001 21.1435 5.81544 19.8384 5.03202C18.4932 4.24859 17.0376 3.85687 15.4715 3.85687ZM5.50296 4.82109C5.56319 4.82109 5.63346 4.85122 5.71377 4.91149L9.65904 8.94915C9.67912 9.0295 9.65904 9.09981 9.5988 9.16008L6.73774 11.9925L6.94855 12.5951L7.34007 13.4388C7.66131 14.1218 8.03275 14.7847 8.45438 15.4275C9.03663 16.3314 9.67912 17.1048 10.3818 17.7476C11.3255 18.6717 12.4599 19.5154 13.785 20.2787C14.4476 20.6604 15.0097 20.9416 15.4715 21.1224L16.0739 21.3936L18.9952 18.4708C19.0353 18.4306 19.0654 18.4105 19.0855 18.4105C19.1056 18.4105 19.1357 18.4306 19.1759 18.4708L23.2416 22.5386C23.2817 22.5788 23.3018 22.6089 23.3018 22.629C23.3018 22.629 23.2817 22.6491 23.2416 22.6893L20.2299 25.6723C19.7882 26.054 19.3064 26.1544 18.7843 25.9736C14.6885 24.3867 11.2753 22.2172 8.54473 19.4652C6.8582 17.7778 5.38249 15.8594 4.1176 13.71C3.2141 12.1632 2.51138 10.6667 2.00944 9.22034V9.19021C1.92913 9.00942 1.91909 8.79849 1.97932 8.55744C2.03956 8.2963 2.14999 8.09542 2.31061 7.9548L5.29214 4.91149C5.35238 4.85122 5.42265 4.82109 5.50296 4.82109ZM15.4715 7.71375V9.64218C16.2746 9.64218 16.9573 9.92342 17.5194 10.4859C18.0816 11.0483 18.3627 11.7313 18.3627 12.5348H20.2902C20.2902 11.6711 20.0693 10.8675 19.6276 10.1243C19.206 9.38104 18.6237 8.79849 17.8808 8.37665C17.138 7.93471 16.3349 7.71375 15.4715 7.71375Z"
      fill="#B4AD8D"
    />
  </svg>
);

const FaxIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.0625 1.64062V6.5625H8.09375V4.59375H2.1875V22.3125H4.15625V23.2969C4.15625 24.0967 4.44336 24.7837 5.01758 25.3579C5.6123 25.9526 6.30957 26.25 7.10938 26.25C7.90918 26.25 8.59619 25.9526 9.17041 25.3579C9.76514 24.7837 10.0625 24.0967 10.0625 23.2969V22.3125H25.8125V6.5625H21.875V1.64062H10.0625ZM12.0312 3.60938H19.9062V8.53125H12.0312V3.60938ZM4.15625 6.5625H6.125V20.3438H4.15625V6.5625ZM8.09375 8.53125H10.0625V10.5H21.875V8.53125H23.8438V20.3438H8.09375V8.53125ZM11.0469 12.4688V14.4375H13.0156V12.4688H11.0469ZM14.9844 12.4688V14.4375H16.9531V12.4688H14.9844ZM18.9219 12.4688V14.4375H20.8906V12.4688H18.9219ZM11.0469 16.4062V18.375H13.0156V16.4062H11.0469ZM14.9844 16.4062V18.375H16.9531V16.4062H14.9844ZM18.9219 16.4062V18.375H20.8906V16.4062H18.9219ZM6.125 22.3125H8.09375V23.2969C8.09375 23.5635 7.99121 23.7993 7.78613 24.0044C7.60156 24.189 7.37598 24.2812 7.10938 24.2812C6.84277 24.2812 6.60693 24.189 6.40186 24.0044C6.21729 23.7993 6.125 23.5635 6.125 23.2969V22.3125Z"
      fill="#B4AD8D"
    />
  </svg>
);

const EmailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.95455 2.625V4.59624L1.75 8.63565V25.375H26.5682V8.63565L20.3636 4.59624V2.625H7.95455ZM10.0227 4.69318H18.2955V12.6428L14.1591 15.3249L10.0227 12.6428V4.69318ZM11.0568 6.76136V8.82955H17.2614V6.76136H11.0568ZM7.95455 7.0522V11.2855L4.6907 9.18501L7.95455 7.0522ZM20.3636 7.0522L23.6275 9.18501L20.3636 11.2855V7.0522ZM11.0568 9.86364V11.9318H17.2614V9.86364H11.0568ZM3.81818 11.0916L14.1591 17.7809L24.5 11.0916V23.3068H3.81818V11.0916Z"
      fill="#B4AD8D"
    />
  </svg>
);

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    howDidYouFindUs: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [findUsOptions, setFindUsOptions] = useState([]);

  useEffect(() => {
    ArticleServices.getHowDidYouFindUsOptions()
      .then((options) => setFindUsOptions(options))
      .catch((error) => {
        console.error("Could not fetch options:", error);
        setFindUsOptions([
          { id: 1, name: "Search Engine" },
          { id: 2, name: "Social Media" },
        ]);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    ArticleServices.submitForm(formData)
      .then(() => {
        setSubmissionStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          howDidYouFindUs: "",
          message: "",
        });
      })
      .catch(() => setSubmissionStatus("error"))
      .finally(() => setIsSending(false));
  };

  return (
    <section className="contact-us-section container">
      <Row className="gy-5">
        <Col lg={5} md={12}>
          <h2 className="contact-form-title">Contact US</h2>
          <p className="contact-form-subtitle">
            Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo
            molestie vel, ornare non id blandit netus.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="row">
              <div className="col-sm-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-6 mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="subject"
                placeholder="Subject *"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <select
                className="form-select"
                name="howDidYouFindUs"
                value={formData.howDidYouFindUs}
                onChange={handleChange}
              >
                <option value="" disabled>
                  How did you find us?
                </option>
                {findUsOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <textarea
                className="form-control"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 send-button"
              disabled={isSending}
            >
              {isSending ? "SENDING..." : "SEND"}
            </button>

            {submissionStatus === "success" && (
              <div className="alert alert-success mt-3">
                Message sent successfully!
              </div>
            )}
            {submissionStatus === "error" && (
              <div className="alert alert-danger mt-3">
                Failed to send message.
              </div>
            )}
          </form>

          <div className="quick-contact-info d-flex flex-wrap justify-content-between mt-4">
            <div className="contact-item d-flex align-items-center mb-3">
              <span className="me-2 me-md-3">
                <PhoneIcon />
              </span>
              <div>
                <div className="contact-txt">PHONE</div>
                <div className="info-txt">03 5432 1234</div>
              </div>
            </div>
            <div className="contact-item d-flex align-items-center mb-3">
              <span className="me-2 me-md-3">
                <FaxIcon />
              </span>
              <div>
                <div className="contact-txt">FAX</div>
                <div className="info-txt">03 5432 1234</div>
              </div>
            </div>
            <div className="contact-item d-flex align-items-center mb-3">
              <span className="me-2 me-md-3">
                <EmailIcon />
              </span>
              <div>
                <div className="contact-txt">EMAIL</div>
                <div className="info-txt small-email">info@marcc.com.au</div>
              </div>
            </div>
          </div>
        </Col>

        <Col lg={7} md={12} className="map-container">
          <div className="map-placeholder ps-lg-4">
            <img
              src={mapimg}
              alt="Location Map"
              className="img-fluid w-100 h-100"
            />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default ContactUsForm;
