import { Col, Container, Row } from "react-bootstrap";
import "./css/JoinUs.css";
import Image from "/OBJECTS.png";
const CheckCircle = () => {
  return (
    <svg
      width="70"
      height="71"
      viewBox="0 0 70 71"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M35 62.125C49.4975 62.125 61.25 50.2046 61.25 35.5C61.25 20.7954 49.4975 8.875 35 8.875C20.5025 8.875 8.75 20.7954 8.75 35.5C8.75 50.2046 20.5025 62.125 35 62.125Z"
        fill="#7E54E0"
        stroke="#7E54E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M47.0312 28.8438L30.9895 44.375L22.9688 36.6094"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const featureBoxes = [
  {
    title: "Ut justo ligula, vehicula sed egestas vel.",
    description:
      "Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio.",
  },
  {
    title: "Aenean vitae leo leo praesent ullamcorper ac.",
    description:
      "Aenean vitae leo leo. Praesent ullamcorper ac libero et mattis. Aenean vel erat at neque viverra feugiat. ",
  },
  {
    title: "Ut justo ligula, vehicula sed egestas vel.",
    description:
      "Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio.",
  },
];

const JoinUs = () => {
  return (
    <section className="JoinUs pb-4 mt-5">
      <Container>
        <Row className="d-flex align-items-center JoinUs-row ">
          <Col lg={6} md={6} sm={12} className="JoinUs-1col text-start">
            <h2>Why you will join our team</h2>       
            <p className="mb-0">
              Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat
              felis. Vestibulum non consectetur tortor. Morbi at orci vehicula,
              vehicula mi ut, vestibulum odio.          
            </p>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <div className="JoinUs-image-wrapper">
              <img
                src={Image}
                alt={`Hero Image `}
                className="img-fluid JoinUs-image"
              />
            </div>
          </Col>
        </Row>
        <Row className="joinusboxes-row ">
          {featureBoxes.map((box, index) => (
            <Col lg={4} key={index} className="joinus-box-col mb-4 px-0">
              <div className="joinus-box py-4 px-3">
                <div className="mb-2 ">
                  <CheckCircle />       
                </div>
                <div className="box-title mb-2">{box.title}</div>               
                <div className="box-description">{box.description}</div>       
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default JoinUs;
