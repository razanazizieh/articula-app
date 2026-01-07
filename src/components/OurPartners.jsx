import { Container, Row, Col } from "react-bootstrap";
import "./css/OurPartners.css";
import logo1 from "/partner1.png";
import logo2 from "/partner2.png";
import logo3 from "/partner3.png";
import logo4 from "/partner4.png";
import logo5 from "/partner5.png";
import logo6 from "/Vector.png";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const partnersData = [
  { id: 1, name: "AMG.CO", logo: logo1 },
  { id: 2, name: "YouTube", logo: logo2 },
  { id: 3, name: "Verizon", logo: logo3 },
  { id: 4, name: "Slack", logo: logo4 },
  { id: 5, name: "Google", logo: logo5 },
  { id: 6, name: "Lenovo", logo: logo6 },
  { id: 7, name: "AMG.CO", logo: logo1 },
  { id: 8, name: "YouTube", logo: logo2 },
  { id: 9, name: "Verizon", logo: logo3 },
  { id: 10, name: "Slack", logo: logo4 },
  { id: 11, name: "Google", logo: logo5 },
  { id: 12, name: "Lenovo", logo: logo6 },
];

const OurPartners = () => {
  return (
    <section className="partners-section">
      <Container fluid>
        <Row className="py-5 mt-5">
          <Col className="text-center">
            <div className="sec-title ">
              Our <span>Partners</span>
            </div>
          </Col>
        </Row>
        <Row className="logos-swiper-container ps-4">
          <Swiper
            slidesPerView={5.5}
            spaceBetween={50}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 2.5, spaceBetween: 20 },
              576: { slidesPerView: 3.5, spaceBetween: 30 },
              992: { slidesPerView: 5.5, spaceBetween: 40 },
            }}
            className="partners-swiper"
          >
            {partnersData.map((partner) => (
              <SwiperSlide key={partner.id}>
                <div className="partner-logo-box">
                  <img
                    src={partner.logo}
                    alt={partner.name + " Logo"}
                    className="partner-logo-img img-fluid"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Row>
      </Container>
    </section>
  );
};

export default OurPartners;
