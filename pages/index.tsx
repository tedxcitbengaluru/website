import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

export default function Home() {
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <div style={{ margin: 0, padding: 0, width: '100vw', height: '80vh', overflow: 'hidden' }}>
      <Image
        src={isMobile ? "/slideshow/Aether_Banner_Mobile.png" : "/slideshow/Aether_Banner.png"}
        alt="Banner slide"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
