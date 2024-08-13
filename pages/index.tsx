import Carousel from 'react-bootstrap/Carousel';

export default function HomePage() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          src="/slideshow/Aether_Banner.png"
          className="d-block w-100 h-50"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}


