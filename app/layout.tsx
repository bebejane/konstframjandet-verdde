import '@/styles/index.scss';
import s from './layout.module.scss';
import cn from 'classnames';
import { Footer, FullscreenGallery, Menu, MenuMobile } from '@/components';
import { buildMenu } from '@/lib/menu';
import { apiQuery } from 'next-dato-utils/api';
import { FooterDocument } from '@/graphql';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const menu = await buildMenu();
	const { footer } = await apiQuery(FooterDocument);
	/*
	useEffect(() => {
		// Preload background images
		const sectionIds = ['om', 'kontakt', 'pa-gang', 'vad-vi-gor'];

		sectionIds.forEach((sectionId) => {
			const img = new Image();
			img.src = `${process.env.NEXT_PUBLIC_SITE_URL}/images/sections/${sectionId}.svg`;
		});
	}, []);
	useEffect(() => {
		const sectionId = router.pathname.split('/')?.[1];
		document.body.style.backgroundImage = sectionId ? `url(/images/sections/${sectionId}.svg)` : 'none';
	}, [router.pathname]);
	
	const [showMenu] = useStore((state) => [state.showMenu]);
	*/

	return (
		<html lang='en'>
			<body>
				<div className={s.layout}>{children}</div>
				<Menu items={menu} />
				<MenuMobile items={menu} />
				<Footer menu={menu} footer={footer} />
				<FullscreenGallery />
			</body>
		</html>
	);
}
