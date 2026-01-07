import { Col, Container, Row } from "react-bootstrap";
import "./css/AboutBanner.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import HeroImage from "/BaneerAbout.png";

const bannerSlides = [
  {
    startYear: "2011",
    endYear: "2025",
    title: "We share knowledge with the world",
    description: `Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.`,
    image: HeroImage,
  },
  {
    startYear: "2011",
    endYear: "2025",
    title: "We share knowledge with the world",
    description: `Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.`,
    image: HeroImage,
  },
  {
    startYear: "2011",
    endYear: "2025",
    title: "We share knowledge with the world",
    description: `Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.`,
    image: HeroImage,
  },
  {
    startYear: "2011",
    endYear: "2025",
    title: "We share knowledge with the world",
    description: `Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.`,
    image: HeroImage,
  },
];

const AboutBanner = () => {
  return (
    <Container fluid className="p-0 main-banner-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="mySwiper full-banner-swiper"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Row className="d-flex  banner-row gx-0">
              <Col lg={6} md={6} sm={12} className="banner-1col pt-3">
                <p className="timeline-years ">{`${slide.startYear}-${slide.endYear}`}</p>
                <h1 className="banner-heading pe-5 pb-1">{slide.title}</h1>
                <hr className="custom-hr " />
                <p className="banner-p pt-3">{slide.description}</p>
              </Col>

              <Col
                lg={6}
                md={6}
                sm={12}
                className="banner-2col-image-holder pe-0"
              >
                <div className="banner-image-absolute-wrapper">
                  <img
                    src={slide.image}
                    alt={`Hero Image Slide ${index + 1}`}
                    className="img-fluid banner-image"
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

export default AboutBanner;
