import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import ViewMoreButton from "./ViewMoreButton";
import "./css/JobOpportunities.css";

import img1 from "/jobop1.png";
import img2 from "/jobop2.png";
import img3 from "/jobop3.png";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const ParttimeIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.55 17C1.84167 17 1.23958 16.7521 0.74375 16.2563C0.247917 15.7604 0 15.1583 0 14.45V11.9H2.55V0H15.3V7.735C15.0167 7.66417 14.7298 7.64292 14.4394 7.67125C14.149 7.69958 13.8692 7.77042 13.6 7.88375V1.7H4.25V11.9H9.35L7.65 13.6H1.7V14.45C1.7 14.6908 1.78146 14.8927 1.94438 15.0556C2.10729 15.2185 2.30917 15.3 2.55 15.3H7.65V17H2.55ZM9.35 17V14.3013L13.005 10.6462L13.9187 11.56L10.625 14.8325V15.725H11.5175L14.8112 12.4525L15.7038 13.345L12.0487 17H9.35ZM15.7038 13.345L13.005 10.6462L14.0675 9.58375C14.2233 9.42792 14.4217 9.35 14.6625 9.35C14.9033 9.35 15.1017 9.42792 15.2575 9.58375L16.7663 11.0925C16.9221 11.2483 17 11.4467 17 11.6875C17 11.9283 16.9221 12.1267 16.7663 12.2825L15.7038 13.345ZM5.1 5.95V4.25H12.75V5.95H5.1ZM5.1 8.5V6.8H12.75V8.5H5.1Z"
      fill="#7B61FF"
    />
  </svg>
);
const BarChartIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 25V12.5"
      stroke="#E34444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.5 25V5"
      stroke="#E34444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 25V20"
      stroke="#E34444"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25Z"
      stroke="#23BD33"
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
    <path
      d="M15 8.4375V15H21.5625"
      stroke="#23BD33"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const jobData = [
  {
    id: 1,
    image: img3,
    title: "System Analysis",
    experience: "2 Years of experience",
    salary: "$300",
    duration: "/ Month",
    type: "Part Time",
    level: "Senior",
    schedule: "Full Time",
  },
  {
    id: 2,
    image: img1,
    title: "System Analysis",
    experience: "2 Years of experience",
    salary: "$300",
    duration: "/ Month",
    type: "Part Time",
    level: "Senior",
    schedule: "Full Time",
  },
  {
    id: 3,
    image: img2,
    title: "System Analysis",
    experience: "2 Years of experience",
    salary: "$300",
    duration: "/ Month",
    type: "Part Time",
    level: "Senior",
    schedule: "Full Time",
  },
  {
    id: 4,
    image: img3,
    title: "System Analysis",
    experience: "2 Years of experience",
    salary: "$300",
    duration: "/ Month",
    type: "Part Time",
    level: "Senior",
    schedule: "Full Time",
  },
];

const JobOpportunities = () => {
  return (
    <section className="job-section-wrapper">
      <Container>
        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="mySwiper job-swiper"
        >
          <SwiperSlide>
            <Row className="g-5 px-3 job-slide">
              {jobData.map((job) => (
                <Col key={job.id} xs={12} md={12} lg={6} className="d-flex">
                  <Card className="job-card d-flex flex-sm-row flex-column align-items-stretch w-100">
                    <Col xs={12} sm={5} md={4} lg={4} className="p-0">
                      <div className="cardimg-container h-100">
                        <img
                          src={job.image}
                          alt={job.title}
                          className="cardimg"
                        />
                      </div>
                    </Col>
                    <Col xs={12} sm={7} md={8} lg={8} className="p-0">
                      <Card.Body className="custom-job-body px-4 py-4 d-flex flex-column justify-content-center h-100">
                        <div className="d-flex justify-content-between mb-3 me-2 align-items-center">
                          <span className="Featured">Featured</span>
                          <span className="job-sal">
                            {job.salary}
                            <span className="job-dur">{job.duration}</span>
                          </span>
                        </div>
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Text>{job.experience}</Card.Text>
                        <div className="line-divider my-3"></div>
                        <div className="d-flex gap-3 align-items-center card-footerline flex-wrap">
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <ParttimeIcon />
                            </span>
                            {job.type}
                          </div>
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <BarChartIcon />
                            </span>
                            {job.level}
                          </div>
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <ClockIcon />
                            </span>
                            {job.schedule}
                          </div>
                        </div>
                      </Card.Body>
                    </Col>
                  </Card>
                </Col>
              ))}
            </Row>
          </SwiperSlide>

          <SwiperSlide>
            <Row className="g-5 px-3 job-slide">
              {jobData.map((job) => (
                <Col
                  key={`slide2-${job.id}`}
                  xs={12}
                  md={12}
                  lg={6}
                  className="d-flex"
                >
                  <Card className="job-card d-flex flex-sm-row flex-column align-items-stretch w-100">
                    <Col xs={12} sm={5} md={4} lg={4} className="p-0">
                      <div className="cardimg-container h-100">
                        <img
                          src={job.image}
                          alt={job.title}
                          className="cardimg"
                        />
                      </div>
                    </Col>
                    <Col xs={12} sm={7} md={8} lg={8} className="p-0">
                      <Card.Body className="custom-job-body px-4 py-4 d-flex flex-column justify-content-center h-100">
                        <div className="d-flex justify-content-between mb-3 me-2 align-items-center">
                          <span className="Featured">Featured</span>
                          <span className="job-sal">
                            {job.salary}
                            <span className="job-dur">{job.duration}</span>
                          </span>
                        </div>
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Text>{job.experience}</Card.Text>
                        <div className="line-divider my-3"></div>
                        <div className="d-flex gap-3 align-items-center card-footerline flex-wrap">
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <ParttimeIcon />
                            </span>
                            {job.type}
                          </div>
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <BarChartIcon />
                            </span>
                            {job.level}
                          </div>
                          <div className="job-info d-flex align-items-center">
                            <span className="me-1">
                              <ClockIcon />
                            </span>
                            {job.schedule}
                          </div>
                        </div>
                      </Card.Body>
                    </Col>
                  </Card>
                </Col>
              ))}
            </Row>
          </SwiperSlide>
        </Swiper>

        <ViewMoreButton left="15%" path="/jobs" />
      </Container>
    </section>
  );
};

export default JobOpportunities;
