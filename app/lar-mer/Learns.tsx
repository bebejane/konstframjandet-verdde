'use client';

import { CardContainer, Card, Thumbnail } from '@/components';

export default function LearnsFilter({ learns, filter, allLearnMoreCategories }: any) {
	return (
		<CardContainer key={filter}>
			{[...learns].map((item) => (
				<Card key={item.id}>
					<Thumbnail
						className={item.__typename === 'LearnMoreShortTextRecord' ? 'textBox' : ''}
						title={item.__typename === 'LearnMoreRecord' ? item.name : null}
						category={
							item.__typename === 'LearnMoreRecord'
								? allLearnMoreCategories.find((c) => c.id === item.learnMoreCategory?.id)?.title
								: null
						}
						image={item.image as FileField}
						slug={`/lar-mer/${item.__typename === 'LearnMoreRecord' ? item.slug : null}`}
					/>
				</Card>
			))}
		</CardContainer>
	);
}
