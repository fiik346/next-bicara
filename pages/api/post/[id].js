const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY
const appId = process.env.APP_ID

export default async function indexPost(req, res) {
  const {body} = req
  const {id} = req.query
  const headers = {
    "X-Parse-Application-Id": appId,
    "X-Parse-REST-API-Key": apiKey,
    "X-Parse-Session-Token": req.headers.token,
  }
  if(req.method === 'GET') {
    const data = await fetch(apiUrl+`/classes/Post/${id}`, {
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": apiKey
      }
    })
    const result = await data.json()
    res.status(data.status).json(result)
  }
  if(req.method === 'PUT') {
    const data = await fetch(apiUrl+`/classes/Post/${id}`, {
      method: 'PUT',
      headers: {
        "X-Parse-Application-Id": appId,
        "X-Parse-REST-API-Key": apiKey,
        "X-Parse-Session-Token": req.headers.token,
      },
      body
    })
    const result = await data.json()
    console.log(body)
    res.status(data.status).json(result)
  }

}
