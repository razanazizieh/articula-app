import { Col, Container, Row, Button } from "react-bootstrap";
import "./css/JobsBanner.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import HeroImage from "/JobsBanner.png";

const Arrow1 = () => {
  return (
    <svg
      width="41"
      height="34"
      viewBox="0 0 41 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.9736 8.82183L29.4767 7.32017L37.6636 15.5043C37.7956 15.6354 37.9003 15.7913 37.9718 15.9631C38.0433 16.1349 38.0801 16.3191 38.0801 16.5051C38.0801 16.6912 38.0433 16.8754 37.9718 17.0472C37.9003 17.2189 37.7956 17.3749 37.6636 17.506L29.4767 25.6943L27.9751 24.1927L35.6591 16.5073L27.9736 8.82183Z"
        fill="#B4AD8D"
      />
      <path
        d="M17.499 8.82183L19.0021 7.32017L27.189 15.5043C27.321 15.6354 27.4257 15.7913 27.4972 15.9631C27.5687 16.1349 27.6055 16.3191 27.6055 16.5051C27.6055 16.6912 27.5687 16.8754 27.4972 17.0472C27.4257 17.2189 27.321 17.3749 27.189 17.506L19.0021 25.6943L17.5005 24.1927L25.1845 16.5073L17.499 8.82183Z"
        fill="#A1A1A1"
      />
      <path
        d="M7.49904 8.82183L9.00212 7.32017L17.189 15.5043C17.321 15.6354 17.4257 15.7913 17.4972 15.9631C17.5687 16.1349 17.6055 16.3191 17.6055 16.5051C17.6055 16.6912 17.5687 16.8754 17.4972 17.0472C17.4257 17.2189 17.321 17.3749 17.189 17.506L9.00212 25.6943L7.50046 24.1927L15.1845 16.5073L7.49904 8.82183Z"
        fill="#EBEBEB"
      />
    </svg>
  );
};

const bannerSlides = [
  {
    title: "Join the most incredible & creative team.",
    description: `Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.`,
    image: HeroImage,
  },
  {
    title: "Join the most incredible & creative team.",
    description: `Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.`,
    image: HeroImage,
  },
  {
    title: "Join the most incredible & creative team.",
    description: `Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.`,
    image: HeroImage,
  },
  {
    title: "Join the most incredible & creative team.",
    description: `Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.`,
    image: HeroImage,
  },
];

const Banner = () => {
  const handleNavigateToJobs = () => {
    const element = document.getElementById("open-positions-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Container>
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper full-JobsBanner-swiper pt-lg-5"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Row className="d-flex align-items-center JobsBanner-row">
              <Col lg={7} md={6} sm={12} className="JobsBanner-1col pt-5">
                <h1 className="JobsBanner-heading">{slide.title}</h1>
                <p className="JobsBanner-p">{slide.description}</p>
                <Button className="btn btn-job" onClick={handleNavigateToJobs}>
                  View Open Positions
                  <span className="ma-arrow">
                    <Arrow1 />
                  </span>
                </Button>
              </Col>

              <Col lg={5} md={6} sm={12} className="JobsBanner-2col">
                <div className="JobsBanner-image-wrapper">
                  <img
                    src={slide.image}
                    alt={`Hero Image Slide ${index + 1}`}
                    className="img-fluid JobsBanner-image"
                  />
                </div>
              </Col>
            </Row>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Banner;
