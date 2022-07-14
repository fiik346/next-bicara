const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY
const appId = process.env.APP_ID

export default async function indexPost(req, res) {
  const body = {
    slug: req.query.slug
  }
  if(req.method === 'GET') {
    const data = await fetch(apiUrl+'/functions/checkSlug', {
      method: 'POST',
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": apiKey
      },
      body: JSON.stringify(body)
    })
    const result = await data.json()
    res.status(200).json(result.result)
  }
}
