const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY
const appId = process.env.APP_ID

export default async function indexPost(req, res) {
  const { slug } = req.query
  if(req.method === 'GET') {
    const data = await fetch(apiUrl+`/classes/Post?where={"slug":"${slug}"}&limit=1&include=author,Tag`, {
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": apiKey
      },
    })
    const result = await data.json()
    if(result.results && result.results.length === 1) {
      res.status(200).json(result.results[0])
    }
    else {
      res.status(400).json({statusCode: 404, message: "Post not found"})
    }
  }
}
