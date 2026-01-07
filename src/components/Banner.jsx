import { Col, Container, Row, Button } from "react-bootstrap";
import "./css/Banner.css";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import HeroImage from "/Heroimg.png";

const bannerSlides = [
  {
    title: "Articula – Your Gateway to Premium Articles",
    description: `Discover high-quality articles written by experts and creators in various scientific and technical fields. Join a community of readers and writers and explore exclusive, knowledge-driven content.`,
    image: HeroImage,
  },
  {
    title: "Design Principles for Creators",
    description: `Learn the essential elements of modern design to make your content stand out. Access exclusive guides and tutorials from top designers.`,
    image: HeroImage,
  },
  {
    title: "Unlock Your Potential Today",
    description: `Explore a wide range of topics, from science and technology to arts and literature. Join Articula and start your learning journey.`,
    image: HeroImage,
  },
];

const Banner = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => navigate("/register");
  const handleStart = () => navigate("/articles");

  return (
    <section className="banner-wrapper">
      <Container>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mySwiper full-banner-swiper full-Homebanner-swiper "
        >
          {bannerSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Row className="d-flex align-items-center banner-row pt-lg-5">
                <Col lg={6} md={12} className="banner-1col pt-5 order-1">
                  <h1 className="banner-heading">{slide.title}</h1>
                  <hr className="custom-hr" />
                  <p className="banner-p py-4">{slide.description}</p>
                  <div className="banner-btns-container d-flex gap-3 flex-wrap">
                    <Button
                      variant="primary"
                      className="pri-btn"
                      onClick={handleStart}
                    >
                      Start Reading
                    </Button>
                    <Button
                      variant="light"
                      className="sec-btn"
                      onClick={handleCreateAccount}
                    >
                      Create Account
                    </Button>
                  </div>
                </Col>

                <Col lg={6} md={12} className="text-center order-2">
                  <div className="banner-image-wrapper">
                    <img
                      src={slide.image}
                      alt={`Hero Slide ${index + 1}`}
                      className="img-fluid banner-image"
                    />
                  </div>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Banner;
