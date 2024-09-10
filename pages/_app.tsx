import '/styles/index.scss'
import { Layout } from '/components';
import { PageProvider } from '/lib/context/page'
import { DefaultDatoSEO } from 'dato-nextjs-utils/components';
import { useRouter } from 'next/router';
import { locales } from '/lib/i18n'
import { PROJECT_NAME } from '/lib/constant';
import { sv } from 'date-fns/locale'
import setDefaultOptions from 'date-fns/setDefaultOptions';
import { useEffect } from 'react';

setDefaultOptions({ locale: sv })

function App({ Component, pageProps, router }) {

  setDefaultOptions({ locale: sv })

  const page = pageProps.page || {} as PageProps
  const { asPath } = useRouter()
  const siteTitle = PROJECT_NAME
  const isHome = asPath === '/' || locales.find(l => asPath === `/${l}`) !== undefined
  const errorCode = parseInt(router.pathname.replace('/', ''))
  const isError = (!isNaN(errorCode) && (errorCode > 400 && errorCode < 600)) || router.pathname.replace('/', '') === '_error'

  useEffect(() => {

    // Preload background images
    const sectionIds = ['about', 'kontakt', 'pa-gang', 'vad-vi-gor']

    sectionIds.forEach(sectionId => {
      const img = new Image()
      img.src = `${process.env.NEXT_PUBLIC_SITE_URL}/images/sections/${sectionId}.svg`
    })

  }, [])

  if (isError) return <Component {...pageProps} />

  return (
    <>
      <DefaultDatoSEO siteTitle={siteTitle} site={pageProps.site} path={asPath} />
      <PageProvider value={{ ...page, year: pageProps.year, isHome }}>
        <Layout
          title={siteTitle}
          menu={pageProps.menu || []}
          footer={pageProps.footer}
          general={pageProps.general}
        >
          <Component {...pageProps} />
        </Layout>
      </PageProvider>
    </>
  );
}

export default App;
