import { Col, Container, Row, Button } from "react-bootstrap";
import "./css/FooterBanner.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import HeroImage from "/footer1.jpg";
import AnotherImage from "/footer2.png";
import ThirdImage from "/footer3.png";
import FourthImage from "/footer4.png";

const MailIcon = () => {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.125 5.03125L11.5 12.9375L2.875 5.03125"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.875 5.03125H20.125V17.25C20.125 17.4406 20.0493 17.6234 19.9145 17.7582C19.7797 17.893 19.5969 17.9688 19.4062 17.9688H3.59375C3.40313 17.9688 3.22031 17.893 3.08552 17.7582C2.95073 17.6234 2.875 17.4406 2.875 17.25V5.03125Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.93187 11.5L3.09668 17.7656"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.9037 17.7657L13.0684 11.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const BANNER_TITLE = "Get In touch";
const BANNER_DESCRIPTION = `want to get in touch ? we’d love to hear from you heres how you can reach us.`;

const bannerSlides = [
  { image: HeroImage },
  { image: AnotherImage },
  { image: ThirdImage },
  { image: FourthImage },
];

const Banner = () => {
  return (
    <section className="contct-1sec">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper banner-swiper "
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index} className="banner-slide-item">
            <div className="banner-background-layer">
              <img
                src={slide.image}
                alt={`Hero Image Slide ${index + 1}`}
                className="banner-full-image"
              />
            </div>
            <Container className="banner-content-container my-3">
              <Row className="d-flex align-items-center h-100">
                <Col lg={12} md={12} sm={12}>
                  <h1 className="footer-banner-heading">{BANNER_TITLE}</h1>     
                  <p className="footer-banner-p py-3">{BANNER_DESCRIPTION}</p> 
                  <Button variant="outline-primary" className="footer-pri-btn ">
                  <MailIcon /> Copy Email                
                  </Button>
                </Col>
              </Row>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="custom-pagination"></div>
    </section>
  );
};

export default Banner;
