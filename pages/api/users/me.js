export default async function sessionMe(req,res){
	const { headers } = req
	const data = await fetch(process.env.API_URL+'/users/me', {
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID,
			'X-Parse-REST-API-Key': process.env.API_KEY,
			'X-Parse-Session-Token': headers.token 
		}
	})
	const response = await data.json()
  console.log(response)	
  res.status(data.status).json(response)
}
