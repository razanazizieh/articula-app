import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import "../components/css/Page404.css";
import NotFoundImage from "/404.png";

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Navigation />
      <div className="not-found-page text-center d-flex flex-column align-items-center justify-content-center">
        <Container className="my-5 py-5">
          <h1 className="oops-heading ">oops!</h1>
          <p className="Oops-message ">Oops! page not found</p>

          <div className="error-illustration mx-auto my-4">
            <img
              src={NotFoundImage}
              alt="404 Page Not Found"
              className="img-fluid error-img"
            />
          </div>

          <Button
            variant="primary"
            className="back-btn mt-4"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Page404;
