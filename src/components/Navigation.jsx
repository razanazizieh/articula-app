import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import DropdownArrow from "./DropdownArrow";
import "./css/Navigation.css";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="custom-menu-svg"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const MaterialSymbolsLanguage = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M17 29.75C15.2452 29.75 13.5925 29.4147 12.0417 28.7442C10.4909 28.0727 9.14034 27.1613 7.99001 26.01C6.83967 24.8587 5.92829 23.5082 5.25584 21.9583C4.5834 20.4085 4.24812 18.7557 4.25001 17C4.25001 15.2396 4.58529 13.5854 5.25584 12.0374C5.92734 10.4885 6.83873 9.13939 7.99001 7.99C9.14129 6.84061 10.4918 5.92922 12.0417 5.25583C13.5925 4.58528 15.2452 4.25 17 4.25C18.7605 4.25 20.4146 4.58528 21.9626 5.25583C23.5115 5.92733 24.8611 6.83872 26.0114 7.99C27.1618 9.14128 28.0727 10.4904 28.7442 12.0374C29.4147 13.5863 29.75 15.2405 29.75 17C29.75 18.7548 29.4147 20.4076 28.7442 21.9583C28.0727 23.5091 27.1613 24.8597 26.01 26.01C24.8587 27.1603 23.5096 28.0717 21.9626 28.7442C20.4156 29.4166 18.7614 29.7519 17 29.75ZM17 28.3447C17.8311 27.2765 18.5168 26.2277 19.057 25.1982C19.5963 24.1688 20.035 23.0166 20.3731 21.7416H13.6269C14.0019 23.0884 14.4495 24.2765 14.9699 25.3059C15.4913 26.3354 16.168 27.3483 17 28.3447ZM15.1966 28.1322C14.5355 27.353 13.932 26.3897 13.3861 25.2422C12.8402 24.0956 12.4341 22.9283 12.1678 21.7402H6.73484C7.54706 23.5016 8.69787 24.9466 10.1873 26.0752C11.6776 27.2028 13.3474 27.8885 15.1966 28.1322ZM18.8034 28.1322C20.6526 27.8885 22.3224 27.2028 23.8128 26.0752C25.3021 24.9466 26.453 23.5016 27.2652 21.7402H21.8337C21.4748 22.9462 21.0229 24.1225 20.4779 25.2691C19.932 26.4166 19.3739 27.3719 18.8034 28.1322ZM6.15684 20.3249H11.8731C11.7654 19.7431 11.6899 19.1765 11.6464 18.6249C11.6011 18.0743 11.5784 17.5327 11.5784 17C11.5784 16.4673 11.6006 15.9257 11.645 15.3751C11.6894 14.8245 11.765 14.2578 11.8717 13.6751H6.15826C6.00431 14.1662 5.8839 14.7012 5.79701 15.2802C5.71012 15.8582 5.66667 16.4314 5.66667 17C5.66667 17.5686 5.70965 18.1423 5.79559 18.7212C5.88154 19.3002 6.00195 19.8343 6.15684 20.3235ZM13.2898 20.3235H20.7103C20.8179 19.7427 20.8935 19.1854 20.9369 18.6518C20.9823 18.1192 21.0049 17.5686 21.0049 17C21.0049 16.4314 20.9827 15.8808 20.9383 15.3482C20.894 14.8155 20.8184 14.2583 20.7117 13.6765H13.2883C13.1816 14.2573 13.1061 14.8146 13.0617 15.3482C13.0173 15.8808 12.9951 16.4314 12.9951 17C12.9951 17.5686 13.0173 18.1192 13.0617 18.6518C13.1061 19.1845 13.183 19.7417 13.2898 20.3235ZM22.1283 20.3235H27.8432C27.9971 19.8333 28.1175 19.2992 28.2044 18.7212C28.2904 18.1423 28.3333 17.5686 28.3333 17C28.3333 16.4314 28.2904 15.8577 28.2044 15.2787C28.1185 14.6998 27.9981 14.1657 27.8432 13.6765H22.1269C22.2346 14.2573 22.3101 14.8235 22.3536 15.3751C22.3989 15.9266 22.4216 16.4683 22.4216 17C22.4216 17.5317 22.3994 18.0734 22.355 18.6249C22.3106 19.1765 22.2351 19.7431 22.1283 20.3249M21.8337 12.2598H27.2652C26.435 10.4616 25.2979 9.01661 23.8538 7.92483C22.4098 6.83306 20.7263 6.13842 18.8034 5.84092C19.4645 6.71075 20.0591 7.70572 20.587 8.82583C21.115 9.945 21.5305 11.0897 21.8337 12.2598ZM13.6269 12.2598H20.3731C19.9991 10.9301 19.5377 9.72778 18.989 8.653C18.4403 7.57822 17.7773 6.579 17 5.65533C16.2227 6.57806 15.5597 7.57728 15.011 8.653C14.4623 9.72872 14 10.931 13.6269 12.2598ZM6.73626 12.2598H12.1678C12.4709 11.0906 12.8865 9.94594 13.4144 8.82583C13.9424 7.70572 14.5356 6.71075 15.198 5.84092C13.2581 6.13936 11.5704 6.83825 10.1348 7.93758C8.69929 9.03881 7.56595 10.4791 6.73484 12.2584"
      fill="white"
    />
  </svg>
);

const UserDropdown = ({ userInfo, onSignOut }) => {
  const navigate = useNavigate();
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    setImageLoadFailed(false);
  }, [userInfo?.profilePictureUrl]);

  const firstName =
    userInfo?.firstName || userInfo?.field_name?.[0]?.value || "";
  const username = userInfo?.username || "User";

  const displayName = firstName.trim() !== "" ? firstName : username;

  const getInitials = () => {
    if (firstName && firstName.trim() !== "")
      return firstName.charAt(0).toUpperCase();
    if (username && username !== "") return username.charAt(0).toUpperCase();
    return "U";
  };

  const userPic = userInfo?.profilePictureUrl;

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="light"
        className="d-flex align-items-center bg-transparent border-0 shadow-none p-0 dropdown-toggle-user"
      >
        <span className="me-3 username text-white d-none d-lg-inline fw-light">
          {displayName}
        </span>
        {!userPic || imageLoadFailed ? (
          <div
            className="rounded-circle user-avatar-initials d-flex justify-content-center align-items-center"
            style={{
              width: "42px",
              height: "42px",
              backgroundColor: "#6341af",
              color: "#ffffff",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          >
            {getInitials()}
          </div>
        ) : (
          <img
            src={userPic}
            alt={displayName}
            className="rounded-circle user-avatar-image"
            onError={() => setImageLoadFailed(true)}
            style={{
              width: "42px",
              height: "42px",
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
        )}
        <div className="arrow-wrapper">
          <DropdownArrow />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="shadow-lg user-dropdown border-0 mt-2">
        <Dropdown.Item
          onClick={() => navigate("/AdminDashboard")}
          className="user-dropdown-item py-2"
        >
          Dashboard
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate("/my-account")}
          className="user-dropdown-item py-2"
        >
          My Account
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => navigate("/userArticlesManager")}
          className="user-dropdown-item py-2"
        >
          My Articles
        </Dropdown.Item>
        <Dropdown.Item
          onClick={onSignOut}
          className="user-dropdown-item text-danger py-2"
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

function LanguageDropdown() {
  return (
    <NavDropdown
      title={
        <div className="d-flex align-items-center gap-2">
          <MaterialSymbolsLanguage />
          <span className="text-white fw-light d-none d-lg-inline">
            English
          </span>
          <div className="arrow-wrapper">
            <DropdownArrow />
          </div>
        </div>
      }
      id="lang-dropdown"
      className="custom-lang-dropdown"
    >
      <NavDropdown.Item href="#ar" className="user-dropdown-item py-2 text-end">
        العربية
      </NavDropdown.Item>
      <NavDropdown.Item href="#en" className="user-dropdown-item py-2 text-end">
        English
      </NavDropdown.Item>
    </NavDropdown>
  );
}
function Navigation() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = !!userInfo && (!!userInfo.user_id || !!userInfo.uid);

  const handleSignOut = () => {
    if (logout) {
      logout();
      navigate("/login", { replace: true });
    }
  };

  return (
    <Navbar expand="lg" className="navbar-custom py-2" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-lg-5">
          <Logo />
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-3 gap-lg-4 order-lg-last">
          <div className="d-none d-lg-flex align-items-center">
            <LanguageDropdown />
          </div>

          {isLoggedIn ? (
            <div className="ms-lg-2">
              <UserDropdown
                key={userInfo?.profilePictureUrl || "user"}
                userInfo={userInfo}
                onSignOut={handleSignOut}
              />
            </div>
          ) : (
            <div className="d-none d-lg-flex gap-3">
              <Link to="/login">
                <Button variant="outline-primary" className="outline-btn px-4">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" className="fill-btn px-4">
                  Create Account
                </Button>
              </Link>
            </div>
          )}

          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            className="border-0 p-0 shadow-none ms-2"
          >
            <MenuIcon />
          </Navbar.Toggle>
        </div>

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          placement="end"
          data-bs-theme="dark"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="d-flex flex-column">
            <Nav className="me-auto gap-3 gap-lg-5">
              <Nav.Link
                as={NavLink}
                to="/"
                end
                className="nav-link-custom fw-medium"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/articles"
                className="nav-link-custom fw-medium"
              >
                Articles
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/about-us"
                className="nav-link-custom fw-medium"
              >
                About Us
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/jobs"
                className="nav-link-custom fw-medium"
              >
                Jobs
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/faqs"
                className="nav-link-custom fw-medium"
              >
                FAQs
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/contact"
                className="nav-link-custom fw-medium"
              >
                Contact
              </Nav.Link>
            </Nav>

            <div className="d-lg-none mt-auto pt-4 ">
              {!isLoggedIn && (
                <div className="d-flex flex-column gap-3 mb-4">
                  <Link to="/login" className="w-100">
                    <Button variant="outline-primary" className="w-100 py-2">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" className="w-100">
                    <Button variant="primary" className="w-100 py-2">
                      Create Account
                    </Button>
                  </Link>
                </div>
              )}
              <div className="language-mobile-wrapper p-2 rounded">
                <LanguageDropdown />
              </div>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default Navigation;
