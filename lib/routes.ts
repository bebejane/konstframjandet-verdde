import { categories } from './constant';

export const routes = {
	home: '/',
	about: '/om',
	what: '/vad-vi-gor',
	contact: '/kontakt',
	news: '/pa-gang',
};

export const recordToSlug = (record: any, api_key?: string): string => {
	let path = null;

	if (!record) {
		throw new Error('recordToSlug: Record  is empty');
	}

	if (typeof record === 'string') return record;
	else {
		const { __typename, slug } = record;
		api_key = __typename ? __typename.replace('Record', '').toLowerCase() : api_key;

		switch (api_key) {
			case 'start':
			case 'general':
				path = `/`;
				break;
			case 'about':
				path = `/om/${slug}`;
				break;
			case 'short_text':
				path = `/vad-vi-gor`;
				break;
			case 'program':
			case 'participant':
			case 'partner':
				const category = categories.find((c) => c._apiKey === api_key);
				path = `/vad-vi-gor/${category.slug}/${slug}`;
				break;
			case 'news':
				path = `/pa-gang/${slug}`;
				break;
			case 'learn_more':
				path = `/lar-mer/${slug}`;
				break;
			case 'learn_more_short_text':
				path = `/lar-mer`;
				break;
			case 'learn_more_category':
				path = `/lar-mer`;
				break;
			case 'about_short_text':
				path = `/om`;
				break;
			case 'contact':
				path = `/kontakt`;
				break;
			default:
				break;
		}
	}
	console.log(path);
	return path;
};
