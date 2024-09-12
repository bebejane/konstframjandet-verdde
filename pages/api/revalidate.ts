import { withRevalidate } from 'dato-nextjs-utils/hoc'
import path from 'path';
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
      paths.push('/')
      paths.push(`/om/${slug}`)
      break;
    case 'program': case 'participant': case 'partner': case 'short_text':
      const category = categories.find(c => c._apiKey === api_key)
      paths.push('/')
      paths.push('/vad-vi-gor')
      category && paths.push(`/vad-vi-gor/${category.slug}/${slug}`)
      break;
    case 'news':
      paths.push('/')
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