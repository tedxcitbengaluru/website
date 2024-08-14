export default function HomePage() {
  return (
    <div className="relative">
      <div id="carouselExampleCaptions" className="carousel slide h-screen mt-5">
        <div className="carousel-inner h-full">
          <div className="carousel-item active h-full">
            <img
              src="/slideshow/Aether_Banner.png" 
              className="d-block w-100 h-full object-cover"
              alt="First slide"
            />
          </div>
          <div className="carousel-item h-full">
            <img
              src="/slideshow/image2.jpg" 
              className="d-block w-100 h-full object-cover"
              alt="Second slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second Slide Label</h5>
              <p>Some representative placeholder content for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item h-full">
            <img
              src="/slideshow/image3.jpg" 
              className="d-block w-100 h-full object-cover"
              alt="Third slide"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third Slide Label</h5>
              <p>Some representative placeholder content for the third slide.</p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

