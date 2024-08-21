// pages/_app.tsx
import '@/styles/globals.css';
import TedNavbar from '../components/navbar';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { SheetDataProvider } from '../context/SheetDataContext';

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
        <footer className="fixed bottom-0 left-0 w-full bg-[#ba2318] text-[#E0E0E0] py-4 px-8 text-center text-xs sm:text-sm">
          Copyright 2023 © TEDxCITBengaluru This independent TEDx event is operated under license from TED
        </footer>
      </>
    </SheetDataProvider>
  );
}

export default MyApp;
