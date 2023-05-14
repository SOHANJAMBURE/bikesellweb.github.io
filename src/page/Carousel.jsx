
import carousel3 from "../images/bike_slider.png";

const Carousel = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="false"
    >
      
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={carousel3} className="d-block w-100" alt="..." />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
