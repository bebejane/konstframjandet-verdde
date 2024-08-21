import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';
import { categories } from '/lib/constant';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {

  let path = null;

  const { api_key } = itemType.attributes
  const slug = item.attributes.slug

  switch (api_key) {
    case 'start': case 'general':
      path = `/`
      break;
    case 'about':
      path = `/om/${slug}`
      break;
    case 'program': case 'participant': case 'partner':
      const category = categories.find(c => c._apiKey === api_key)
      path = `/vad-vi-gor/${category.slug}/${slug}`
      break;
    case 'news':
      path = `/pa-gang/${slug}`
      break;
    case 'contact':
      path = `/kontakt`
      break;
    default:
      break;
  }

  return path
})