import '@/styles/globals.css';
import TedNavbar from '../components/navbar';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

interface MyAppProps {
  Component: ReactNode;
  pageProps: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>TEDxCITBengaluru</title>
      </Head>
      <TedNavbar />
      <Component {...pageProps} className="main-content"/>
      <footer className="footer">
        Copyright 2023 © TEDxCITBengaluru This independent TEDx event is
        operated under license from TED
      </footer>
    </>
  );
}

export default MyApp;
