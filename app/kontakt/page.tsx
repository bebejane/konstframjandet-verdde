import { ContactDocument, GlobalDocument } from '@/graphql';
import { Article, PageHeader } from '@/components';
import { apiQuery } from 'next-dato-utils/api';
import { pageSlugs } from '@/lib/i18n';

export type Props = {
	contact: ContactRecord;
	general: GeneralRecord;
};

export default async function Contact() {
	const { contact } = await apiQuery(ContactDocument);
	const { general } = await apiQuery(GlobalDocument);

	const { id, image, intro, content } = contact;

	return (
		<>
			<PageHeader header={general.contactSv} headerSmi={general.contactSmi} content={intro} />
			<Article key={id} image={image as FileField} imageSize='small' content={content} />
		</>
	);
}
