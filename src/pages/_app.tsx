// pages/_app.tsx
import '@/styles/globals.css';
import TedNavbar from '../components/navbar';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SheetDataProvider } from '../context/SheetDataContext';
import Footer from '../components/footer';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SheetDataProvider>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TEDxCITBengaluru</title>
        </Head>
        <TedNavbar />
        <Component {...pageProps} className="main-content min-h-screen flex flex-col" />
        <Footer/>
      </>
    </SheetDataProvider>
  );
}

export default MyApp;
