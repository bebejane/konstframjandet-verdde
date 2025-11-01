import '/styles/index.scss';
import { Layout } from '@/components';
import { PageProvider } from '@/lib/context/page';
import { DefaultDatoSEO } from 'next-dato-utils/components';
import { usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n';
import { PROJECT_NAME } from '@/lib/constant';
import { sv } from 'date-fns/locale';
import setDefaultOptions from 'date-fns/setDefaultOptions';
import { useEffect } from 'react';

setDefaultOptions({ locale: sv });

function App({ Component, pageProps, router }) {
	setDefaultOptions({ locale: sv });

	const page = pageProps.page || ({} as PageProps);
	const pathname = usePathname();
	const siteTitle = PROJECT_NAME;
	const isHome = pathname === '/' || locales.find((l) => pathname === `/${l}`) !== undefined;
	const errorCode = parseInt(router.pathname.replace('/', ''));
	const isError =
		(!isNaN(errorCode) && errorCode > 400 && errorCode < 600) || router.pathname.replace('/', '') === '_error';

	useEffect(() => {
		// Preload background images
		const sectionIds = ['om', 'kontakt', 'pa-gang', 'vad-vi-gor'];

		sectionIds.forEach((sectionId) => {
			const img = new Image();
			img.src = `${process.env.NEXT_PUBLIC_SITE_URL}/images/sections/${sectionId}.svg`;
		});
	}, []);

	if (isError) return <Component {...pageProps} />;

	return (
		<>
			<DefaultDatoSEO siteTitle={siteTitle} site={pageProps.site} path={pathname} />
			<PageProvider value={{ ...page, year: pageProps.year, isHome }}>
				<Layout title={siteTitle} menu={pageProps.menu || []} footer={pageProps.footer} general={pageProps.general}>
					<Component {...pageProps} />
				</Layout>
			</PageProvider>
		</>
	);
}

export default App;
