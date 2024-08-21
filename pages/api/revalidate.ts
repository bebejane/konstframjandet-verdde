import { withRevalidate } from 'dato-nextjs-utils/hoc'
import { categories } from '/lib/constant';

export default withRevalidate(async (record, revalidate) => {

  const { api_key } = record.model;
  const { slug } = record
  const paths = []

  switch (api_key) {
    case 'start': case 'general':
      paths.push(`/`)
      break;
    case 'about':
      paths.push(`/om/${slug}`)
      break;
    case 'program': case 'participant': case 'partner':
      const category = categories.find(c => c._apiKey === api_key)
      paths.push('/vad-vi-gor')
      category && paths.push(`/vad-vi-gor/${category.slug}/${slug}`)
      break;
    case 'news':
      paths.push('/pa-gang')
      paths.push(`/pa-gang/${slug}`)
      break;
    case 'contact':
      paths.push(`/kontakt`)
      break;
    default:
      break;
  }

  console.log(paths)
  revalidate(paths)
})