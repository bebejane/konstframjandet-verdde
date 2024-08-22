import { withWebPreviewsEdge } from 'dato-nextjs-utils/hoc';
import { recordToSlug } from '/lib/routes';

export const config = {
  runtime: 'edge'
}

export default withWebPreviewsEdge(async ({ item, itemType }) => {
  const path = recordToSlug(item.attributes, itemType.attributes.api_key)
  return path
})