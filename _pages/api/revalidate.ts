import { withRevalidate } from 'next-dato-utils/hoc';
import path from 'path';
import { categories } from '@/lib/constant';

export default withRevalidate(async (record, revalidate) => {
	console.log('Revalidation triggered for record:', record);

	const { api_key } = record.model;
	const { slug } = record;
	const paths = [];

	switch (api_key) {
		case 'start':
		case 'general':
			paths.push(`/`);
			break;
		case 'about':
			paths.push('/');
			paths.push(`/om/${slug}`);
			break;
		case 'program':
		case 'participant':
		case 'partner':
		case 'short_text':
			const category = categories.find((c) => c._apiKey === api_key);
			paths.push('/');
			paths.push('/vad-vi-gor');
			category && paths.push(`/vad-vi-gor/${category.slug}/${slug}`);
			break;
		case 'news':
			paths.push('/');
			paths.push('/pa-gang');
			paths.push(`/pa-gang/${slug}`);
			break;
		case 'contact':
			paths.push(`/kontakt`);
			break;
		default:
			console.log('Unknown api_key:', api_key);
			break;
	}

	console.log('Revalidating paths:', paths);

	try {
		await revalidate(paths);
		console.log('Successfully revalidated paths:', paths);
	} catch (error) {
		console.error('Error revalidating paths:', error);
	}
});
