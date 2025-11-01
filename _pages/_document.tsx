import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {

  render() {

    const sectionId = this.props?.__NEXT_DATA__?.page?.split('/')[1]

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/hju6dgk.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
        </Head>
        <body style={{ backgroundImage: sectionId ? `url(/images/sections/${sectionId}.svg)` : 'none' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}