import { apiQuery } from 'next-dato-utils/api';
import { SitemapDocument } from '@/graphql';
import { DatoCmsConfig, getUploadReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { categories } from '@/lib/constant';
import { GlobalDocument } from '@/graphql';

export default {
	routes: {
		start: async () => ['/'],
		general: async () => ['/'],
		about: async ({ slug }) => [`/om/${slug}`],
		short_text: async () => ['/vad-vi-gor'],
		program: async ({ slug }) => {
			const category = categories.find((c) => c._apiKey === 'program')?.slug;
			return [`/vad-vi-gor/${category}/${slug}`];
		},
		participant: async ({ slug }) => {
			const category = categories.find((c) => c._apiKey === 'participant')?.slug;
			return [`/vad-vi-gor/${category}/${slug}`];
		},
		partner: async ({ slug }) => {
			const category = categories.find((c) => c._apiKey === 'partner')?.slug;
			return [`/vad-vi-gor/${category}/${slug}`];
		},
		news: async ({ slug }) => [`/pa-gang/${slug}`],
		learn_more: async ({ slug }) => [`/lar-mer/${slug}`],
		learn_more_short_text: async () => ['/lar-mer'],
		learn_more_category: async () => ['/lar-mer'],
		about_short_text: async () => ['/om'],
		contact: async () => ['/kontakt'],
		upload: async (record) => getUploadReferenceRoutes(record.id),
	},
	sitemap: async () => {
		const { allNews, allAbouts, allLearnMores } = await apiQuery(SitemapDocument, { all: true });

		const dynameicRoutes = [
			...allNews.map(({ slug, _updatedAt }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/pa-gang/${slug}`,
				lastModified: new Date(_updatedAt).toISOString(),
				changeFrequency: 'weekly',
				priority: 0.8,
			})),
			...allAbouts.map(({ slug, _updatedAt }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/om/${slug}`,
				lastModified: new Date(_updatedAt).toISOString(),
				changeFrequency: 'weekly',
				priority: 0.8,
			})),
			...allLearnMores.map(({ slug, _updatedAt }) => ({
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/lar-mer/${slug}`,
				lastModified: new Date(_updatedAt).toISOString(),
				changeFrequency: 'weekly',
				priority: 0.8,
			})),
		];

		const staticRoutes = [
			'/',
			'/kontakt',
			'/om',
			'/vad-vi-gor',
			'/pa-gang',
			'/lar-mer',
			'/om/in-english-verdde',
			'/om/samegillii-verdde',
		].map((pathname) => ({
			url: `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}}`,
			lastModified: new Date().toISOString(),
			changeFrequency: pathname === '/' ? 'weekly' : 'monthly',
			priority: pathname === '/' ? 1 : 0.8,
		}));

		return [...staticRoutes, ...dynameicRoutes] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		const { site } = await apiQuery(GlobalDocument);

		return {
			name: site.globalSeo?.siteName ?? '',
			short_name: site.globalSeo?.siteName ?? '',
			description: site.globalSeo?.fallbackSeo?.description ?? '',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#F0A7FF',
			icons: [
				{
					src: '/favicon.ico',
					sizes: 'any',
					type: 'image/x-icon',
				},
			],
		} satisfies MetadataRoute.Manifest;
	},
	robots: async () => {
		return {
			rules: {
				userAgent: '*',
				allow: '/',
			},
		};
	},
} satisfies DatoCmsConfig;
