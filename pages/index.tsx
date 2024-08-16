import Image from 'next/image';

export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '80vh', overflow: 'hidden' }}>
      <Image
        src="/slideshow/Aether_Banner.png"
        alt="First slide"
        layout="fill"  
        objectFit="cover"  
      />
    </div>
  );
}
