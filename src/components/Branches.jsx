import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import BranchCard from "./BrancheCard";
import "swiper/css";
import "swiper/css/navigation";
import branchimg1 from "/branche1.jpg";
import branchimg2 from "/branche2.jpg";
import brancheimg3 from "/branche3.jpg";
import "./css/Branches.css";

const ArrowIcon = () => {
  return (
    <svg
      className="arrow-icon-svg "
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
const LeftArrow = () => {
  return (
    <svg
      width="24"
      height="47"
      viewBox="0 0 34 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.9984 51.9559L28.885 57.0001L2.42443e-05 28.498L28.889 5.10951e-05L34.0017 5.04491L10.226 28.4988L33.9984 51.9559Z"
        fill="#B4AD8D"
      />
    </svg>
  );
};
const RightArrow = () => {
  return (
    <svg
      width="24"
      height="47"
      viewBox="0 0 34 57"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.000347062 51.9551L5.113 56.9999L34.002 28.502L5.11696 -5.61457e-05L0.00361001 5.04409L23.776 28.5012L0.000347062 51.9551Z"
        fill="#B4AD8D"
      />
    </svg>
  );
};
const BRANCHES_DATA = [
  {
    id: 1,
    city: "Dubai, UAE",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: branchimg1,
  },
  {
    id: 2,
    city: "Moscow, Russia",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: branchimg2,
  },
  {
    id: 3,
    city: "Tokyo, Japan",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: brancheimg3,
  },
  {
    id: 4,
    city: "Dubai, UAE",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: branchimg1,
  },
  {
    id: 5,
    city: "Moscow, Russia",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: branchimg2,
  },
  {
    id: 6,
    city: "Tokyo, Japan",
    description: "Lorem Ipsum doller Duis aute irure, No. 6548",
    image: brancheimg3,
  },
];

const Branches = () => {
  return (
    <section className="branches-section ">
      <Container>
        <Row className="mb-5 d-flex align-items-center writer-categories-row ">
          <Col md={12} lg={12} xl={6}>
            <div
              className="browse-all-header align-items-center d-flex 
             justify-content-start "
            >
              <a
                href="/all-branches"
                className="pe-2 d-flex align-items-center"
              >
                <span className="pe-2">
                  <ArrowIcon />
                </span>
                Browse All
              </a>
              <span> We have more Branches to check out.</span>
            </div>
          </Col>
          {/* <Col className="text-end"> */}
          <Col md={12} lg={12} xl={6}>
            <h2
              className="section-title-cat
             text-end justify-content-end mb-0"
            >
              {/* <h2 className="section-title-cat"> */}
              Browse Our&nbsp;<span>Branches</span>
            </h2>
          </Col>
        </Row>

        <div className="branches-swiper-wrapper">
          <Swiper
            modules={[Navigation]}
            spaceBetween={30}
            observer={true}
            observeParents={true}
            navigation={{
              prevEl: ".branches-prev-arrow",
              nextEl: ".branches-next-arrow",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="branchesSwiper"
          >
            {BRANCHES_DATA.map((branch) => (
              <SwiperSlide key={branch.id}>
                <BranchCard
                  id={branch.id}
                  city={branch.city}
                  description={branch.description}
                  image={branch.image}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="branches-prev-arrow">
            <LeftArrow />
          </div>
          <div className="branches-next-arrow">
            <RightArrow />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Branches;
