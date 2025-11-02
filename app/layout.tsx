import '@/styles/index.scss';
import s from './layout.module.scss';
import { Footer, FullscreenGallery, Menu, MenuMobile } from '@/components';
import { buildMenu } from '@/lib/menu';
import { apiQuery } from 'next-dato-utils/api';
import { FooterDocument, GlobalDocument } from '@/graphql';
import { Metadata } from 'next';
import { Icon } from 'next/dist/lib/metadata/types/metadata-types';
import { Suspense } from 'react';

export default async function RootLayout({ children }: LayoutProps<'/'>) {
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

export async function generateMetadata(): Promise<Metadata> {
	return buildMetadata({});
}

export type BuildMetadataProps = {
	title?: string | any;
	description?: string | null | undefined;
	pathname?: string;
	image?: FileField;
};

export async function buildMetadata({
	title,
	description: desc,
	pathname,
	image,
}: BuildMetadataProps): Promise<Metadata> {
	const {
		site: { globalSeo, faviconMetaTags },
	} = await apiQuery(GlobalDocument, {
		revalidate: 60 * 60,
	});

	const siteName = 'Verdde';
	const url = pathname ? `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}` : process.env.NEXT_PUBLIC_SITE_URL;

	const description = !desc
		? (globalSeo?.fallbackSeo?.description ?? '')
		: desc.length > 160
			? `${desc.substring(0, 157)}...`
			: (desc ?? '');

	image = image ?? (globalSeo?.fallbackSeo?.image as FileField);
	title = title ? `${siteName} — ${title}` : siteName;

	return {
		metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL as string),
		icons: faviconMetaTags.map(({ attributes: { rel, sizes, type, href: url } }) => ({
			rel,
			url,
			sizes,
			type,
		})) as Icon[],
		title,
		alternates: {
			canonical: url,
		},
		description,
		openGraph: {
			title: {
				template: `${siteName} — %s`,
				default: siteName ?? '',
			},
			description,
			url,
			images: image
				? [
						{
							url: `${image?.url}?w=1200&h=630&fit=fill&q=80`,
							width: 800,
							height: 600,
							alt: title,
						},
						{
							url: `${image?.url}?w=1600&h=800&fit=fill&q=80`,
							width: 1600,
							height: 800,
							alt: title,
						},
						{
							url: `${image?.url}?w=790&h=627&fit=crop&q=80`,
							width: 790,
							height: 627,
							alt: title,
						},
					]
				: undefined,
			locale: 'sv_SE',
			type: 'website',
		},
	};
}
