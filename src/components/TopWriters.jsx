import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./css/TopWriters.css";
import { UserServices } from "../services/UserServices";
import WriterCard from "./WriterCard";

const ArrowIcon = () => {
  return (
    <svg
      className="arrow-icon-svg arrowright"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.25 12H3.75"
        stroke="#7E54E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 5.25L3.75 12L10.5 18.75"
        stroke="#7E54E0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
const SwiperNavArrow = ({ direction }) => {
  const isPrev = direction === "prev";
  return (
    <svg
      width="28"
      height="37"
      viewBox="0 0 34 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: isPrev ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path
        d="M-3.37369e-06 51.9555L5.113 57L34 28.5L5.113 -2.52538e-06L7.27397e-07 5.0445L23.774 28.5L-3.37369e-06 51.9555Z"
        fill="#B4AD8D"
      />
    </svg>
  );
};

function TopWriters() {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserServices.getTopWriters(8)
      .then((data) => {
        setWriters(data);
      })
      .catch((error) => {
        console.error("Failed to load writers:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Col className="text-center py-5">
        <Spinner
          animation="border"
          variant="primary"
          className="custom-loading-spinner"
        />
      </Col>
    );
  }

  if (writers.length === 0) {
    return null;
  }

  return (
    <section className="py-5 section-writer">
      <Container>
        <Row className="mb-5 d-flex align-items-center writer-categories-row ">
          <Col md={12} lg={6}>
            <h2
              className="section-title-writ
             text-start justify-content-start mb-0"
            >
              Check out our Top&nbsp;<span>Writers</span>         
            </h2>
          </Col>
          <Col md={12} lg={12} xl={6}>
            <div
              className="browse-all-header-writ 
            d-flex  justify-content-end "
            >
              <span>
                Thousands of users waiting for a Articles. Start writing &
                earning now!.      
              </span>
              <a
                href="/all-writers"
                className="ps-2 d-flex align
              -items-center "
              >
                Browse All
                <span>
                  <ArrowIcon />
                </span>
              </a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Swiper
              className="top-writers-custom-slider py-4"
              modules={[Navigation, EffectCoverflow]}
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={3}
              loop={false}
              watchSlidesProgress={true}
              coverflowEffect={{
                rotate: 0,
                stretch: -90,
                depth: 550,
                modifier: 1,
                slideShadows: false,
              }}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1.2,
                  spaceBetween: 10,
                  coverflowEffect: {
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                  },
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  coverflowEffect: {
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                  },
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 0,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: -90,
                    depth: 550,
                    modifier: 1.5,
                    slideShadows: false,
                  },
                },
              }}
            >
              {writers.map((writer) => (
                <SwiperSlide key={writer.id}>
                  <WriterCard writer={writer} />             
                </SwiperSlide>
              ))}
              <div className="custom-swiper-navigation">
                <button className="custom-swiper-button-prev">
                  <SwiperNavArrow direction="prev" />         
                </button>
                <button className="custom-swiper-button-next">
                  <SwiperNavArrow direction="next" />         
                </button>
              </div>
            </Swiper>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default TopWriters;
