import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/ViewMoreButton.css";

const ViewMoreButton = ({ path, children = "View More", left }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (path) {
      navigate(path);
    } else {
      console.warn(
        "ViewMoreButton used without a 'path' prop. Navigation aborted."
      );
    }
  };

  return (
    <Button
      variant="light"
      className="view-more-btn"
      onClick={handleNavigation}
      style={{ left: left }}
    >
      {children}
    </Button>
  );
};

export default ViewMoreButton;
