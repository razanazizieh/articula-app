import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Logo from "./Logo";
import "./css/Navigation.css";
import "../components/css/Login.css";

function Navigation() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/" className="me-5 ">
          <Logo />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex align-items-center gap-4 justify-content-end ms-auto">
            <div className="Q-txt">Don't have an account?</div>
            <Link to="/Register">
              <Button variant="outline-primary" className="outline-btn">
                SIgn Up
              </Button>
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
