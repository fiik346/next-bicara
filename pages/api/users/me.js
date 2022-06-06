export default async function sessionMe(req,res){
	const headers = req.headers
	const data = await fetch(process.env.API_URL+'/users/me', {
		headers: {
			'X-Parse-Application-Id': process.env.APP_ID,
			'X-Parse-REST-API-Key': process.env.API_KEY,
			'X-Parse-Session-Token': req.query.token 
		}
	})
	const response = await data.json()
	if(response.error){
		res.status(response.code).json(response)
	} else {
		res.status(200).json(response)
	}
}
