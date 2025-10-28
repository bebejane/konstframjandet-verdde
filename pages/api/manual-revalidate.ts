import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('Manual revalidation triggered')

    // Revalidate the home page
    await res.revalidate('/')

    console.log('Successfully revalidated /')

    return res.json({
      revalidated: true,
      path: '/',
      timestamp: new Date().toISOString()
    })
  } catch (err) {
    console.error('Error revalidating:', err)
    return res.status(500).json({
      error: 'Error revalidating',
      message: err.message
    })
  }
}
