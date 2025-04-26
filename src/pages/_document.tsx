import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Basic metadata */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool. Analyze text and get reading time estimates instantly." />

          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

          {/* Standard OpenGraph meta tags */}
          <meta property="og:title" content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool" />
          <meta property="og:description" content="Count words, sentences, characters, and paragraphs. Upload images to extract text with our free OCR tool." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://cavcount.app" />
          <meta property="og:image" content="https://cavcount.app/og-image.png" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Cavcount" />
          <meta property="og:locale" content="en_US" />

          {/* Twitter Card meta tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@cavcount" />
          <meta name="twitter:title" content="Cavcount - OCR Word & Sentence Counter | Free Image to Text Tool" />
          <meta name="twitter:description" content="Count words, sentences, characters, and paragraphs with our free OCR tool." />
          <meta name="twitter:image" content="https://cavcount.app/twitter-image.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
