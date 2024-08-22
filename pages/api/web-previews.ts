import { withWebPreviews } from 'dato-nextjs-utils/hoc';
import { recordToSlug } from '/lib/routes';

export const config = {
  runtime: 'nodejs'
}

export default withWebPreviews(async ({ item, itemType }) => {
  const path = recordToSlug(item.attributes, itemType.attributes.api_key)
  return path
})