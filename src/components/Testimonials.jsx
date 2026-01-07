import "./css/Testimonials.css";
import { useEffect, useState } from "react";
import { Container, Col, Spinner } from "react-bootstrap";
import { ArticleServices } from "../services/apiServices";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const DoubleQuotesr1 = () => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.746 25.242C35.88 25.242 38 27.426 38 30.662C38 33.574 35.568 36 32.274 36C28.666 36 26 33.088 26 28.64C26 18.53 33.372 14.486 38 14V18.448C34.862 19.014 31.334 22.168 31.176 25.648C31.334 25.568 31.96 25.242 32.746 25.242Z"
        fill="#FF6636"
      />
      <path
        d="M16.746 25.242C19.882 25.242 22 27.426 22 30.662C22 33.574 19.568 36 16.274 36C12.666 36 10 33.088 10 28.64C10 18.53 17.372 14.486 22 14V18.448C18.862 19.014 15.334 22.168 15.176 25.648C15.334 25.568 15.96 25.242 16.746 25.242Z"
        fill="#FF6636"
      />
    </svg>
  );
};
const DoubleQuotesr2 = () => {
  return (
    <svg
      width="526"
      height="48"
      viewBox="0 0 526 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M493.254 22.758C490.12 22.758 488 20.574 488 17.338C488 14.426 490.432 12 493.726 12C497.334 12 500 14.912 500 19.36C500 29.47 492.628 33.514 488 34V29.552C491.138 28.986 494.666 25.832 494.824 22.352C494.666 22.432 494.04 22.758 493.254 22.758Z"
        fill="#FF6636"
      />
      <path
        d="M509.254 22.758C506.118 22.758 504 20.574 504 17.338C504 14.426 506.432 12 509.726 12C513.334 12 516 14.912 516 19.36C516 29.47 508.628 33.514 504 34V29.552C507.138 28.986 510.666 25.832 510.824 22.352C510.666 22.432 510.04 22.758 509.254 22.758Z"
        fill="#FF6636"
      />
    </svg>
  );
};
const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);

    ArticleServices.getTestimonials()
      .then((data) => {
        setTestimonials(data);
      })
      .catch((err) => {
        console.error("Failed to fetch testimonials:", err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  if (loading)
    return (
      <Col className="text-center py-5">
        <Spinner
          animation="border"
          variant="primary"
          className="custom-loading-spinner"
        />
      </Col>
    );
  if (error)
    return (
      <Col className="text-center py-5">
        <div className="alert alert-danger">
          Error fetching testimonials: {error.message}
        </div>
      </Col>
    );
  return (
    <section className="px-0 py-5 position-relative   testimonials-section">
      <Container fluid className="px-0">
        {testimonials.length > 0 ? (
          <Swiper
            slidesPerView={2.9}
            spaceBetween={30}
            simulateTouch={true}
            breakpoints={{
              1200: {
                slidesPerView: 2.9,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 1.1,
                spaceBetween: 15,
              },
            }}
            className="mySwiper testimonialsmySwiper ms-5"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="testimonial-card-styled">
                  <span className="quote-icon open">
                    <DoubleQuotesr1 />
                  </span>
                  <p
                    className="testimonial-text px-3 m-0"
                    dangerouslySetInnerHTML={{ __html: testimonial.body }}
                  />
                  {/* <p   className="testimonial-text pt-3"> {testimonial.body}</p> */}
                  <span className="quote-icon close">
                    <DoubleQuotesr2 />
                  </span>
                  <div className="author-bar  text-center">
                    <p className="author-name mb-0">{testimonial.full_name}</p>
                    <p className="author-title mb-0">
                      {testimonial.title || "User"}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center">
            No testimonials available at the moment.
          </p>
        )}
      </Container>
    </section>
  );
};

export default Testimonials;
