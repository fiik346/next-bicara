import axios from 'axios'
const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY
const appId = process.env.APP_ID

export default async function indexPost(req, res) {
  const headers = {
    "X-Parse-Application-Id": appId,
    "X-Parse-REST-API-Key": apiKey
  }
  const query = new URLSearchParams({
    include: "author",
    where: `{"draft":false}`,
    limit: 10
  })

  if(req.query){
    Object.keys(req.query).map( (key, index) => {
      if(query.has(key)){
        query.set(key, req.query[key])
      }
      else{
        query.append(key, req.query[key])
      }
    })
  }
  if(req.method === 'GET') {
    const data = await fetch(apiUrl+'/classes/Post?'+query.toString(), {
      headers
    })
    const result = await data.json()
    res.status(data.status).json(data.ok? result.results: result)
  }
}
