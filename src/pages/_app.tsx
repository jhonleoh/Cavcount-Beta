import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

// Ensure we have app-wide Facebook meta tags that are properly configured
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const canonicalUrl = `https://cavcount.app${router.asPath === '/' ? '' : router.asPath}`;

  return (
    <>
      <Head>
        {/* Facebook App ID - should be your actual FB app ID */}
        <meta property="fb:app_id" content="cavcount" />

        {/* Ensure we have a canonical URL so Facebook can properly identify the page */}
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
