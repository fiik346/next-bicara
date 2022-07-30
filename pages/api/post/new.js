const apiUrl = process.env.API_URL
const head   = {
  'Content-Type': 'application/json',
  'X-Parse-Application-Id': process.env.APP_ID,
  'X-Parse-REST-API-Key': process.env.API_KEY
}
export default async function handler(req,res) {
  const { body, headers } = req 
	if(req.method === 'POST'){
    const data = await fetch(apiUrl + '/classes/Post', {
      headers: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': process.env.APP_ID,
        'X-Parse-REST-API-Key': process.env.API_KEY,
        'X-Parse-Session-Token': headers.token,
      },
      method: 'POST',
      body
    }) 
    const result = await data.json()
    console.log(result)
		res.status(data.status).json({ result })
	}
  else {
    res.status(400).json({"error":{"code":"500","message":"Access denied"}})
  }
}
