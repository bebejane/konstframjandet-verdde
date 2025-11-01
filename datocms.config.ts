import { apiQuery } from 'next-dato-utils/api';
//import { SitemapDocument } from '@/graphql';
import { DatoCmsConfig, getUploadReferenceRoutes, getItemReferenceRoutes } from 'next-dato-utils/config';
import { MetadataRoute } from 'next';
import { categories } from '@/lib/constant';

export default {
	routes: {
		start: async () => ['/'],
		general: async () => ['/'],
		about: async ({ slug }) => [`/om/${slug}`],
		short_text: async () => ['/vad-vi-gor'],
		program: async ({ slug }) => [`/vad-vi-gor/${categories.find((c) => c._apiKey === 'program')}/${slug}`],
		participant: async ({ slug }) => [`/vad-vi-gor/${categories.find((c) => c._apiKey === 'participant')}/${slug}`],
		partner: async ({ slug }) => [`/vad-vi-gor/${categories.find((c) => c._apiKey === 'partner')}/${slug}`],
		news: async ({ slug }) => [`/pa-gang/${slug}`],
		learn_more: async ({ slug }) => [`/lar-mer/${slug}`],
		learn_more_short_text: async () => ['/lar-mer'],
		learn_more_category: async () => ['/lar-mer'],
		about_short_text: async () => ['/om'],
		contact: async () => ['/kontakt'],
		upload: async (record) => getUploadReferenceRoutes(record.id),
	},
	sitemap: async () => {
		return [] as MetadataRoute.Sitemap;
	},
	manifest: async () => {
		return {
			name: 'Baltic Art Center',
			short_name: 'BAC',
			description: 'Baltic Art Center is a residency for contemporary art on the island of Gotland in the Baltic Sea',
			start_url: '/',
			display: 'standalone',
			background_color: '#ffffff',
			theme_color: '#000000',
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
