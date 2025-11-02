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
