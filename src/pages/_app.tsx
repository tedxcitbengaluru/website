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
      <div className="flex flex-col min-h-screen">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>TEDxCITBengaluru</title>
        </Head>
        <TedNavbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </SheetDataProvider>
  );
}

export default MyApp;
