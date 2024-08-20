import s from "./index.module.scss";
import withGlobalProps from "/lib/withGlobalProps";
import { AllParticipantsDocument } from "/graphql";
import { CardContainer, Card, Thumbnail } from "/components";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { DatoSEO } from "dato-nextjs-utils/components";
import { pageSlugs } from "/lib/i18n";
export type Props = {
  participants: (ParticipantRecord & ThumbnailImage)[]
}

export default function Participant({ participants }: Props) {

  const { asPath } = useRouter()

  return (
    <>
      <DatoSEO title={'Vad vi gör'} />
      <CardContainer key={asPath}>
        {participants.map(({ id, image, name, intro, slug }) =>
          <Card key={id}>
            <Thumbnail
              title={name}
              image={image}
              intro={intro}
              titleRows={1}
              slug={`/vad-vi-gor/${slug}`}
            />
          </Card>
        )}
      </CardContainer>
    </>
  );
}

export const getStaticProps = withGlobalProps({ queries: [AllParticipantsDocument] }, async ({ props, revalidate }: any) => {

  return {
    props: {
      ...props,
      page: {
        section: 'what',
        slugs: pageSlugs('what')
      } as PageProps
    },
    revalidate
  };
});