export default async function sessionMe(req,res){
	const { headers, body, query } = req
  if(req.method === 'PUT'){
  	const data = await fetch(`${process.env.API_URL}/users/${query.id}`, {
      method: 'PUT',
  		headers: {
	  		'X-Parse-Application-Id': process.env.APP_ID,
			  'X-Parse-REST-API-Key': process.env.API_KEY,
  		  'X-Parse-Session-Token': headers.token
	  	},
      body
  	})
  	const response = await data.json()
	  if(response.error){
		  res.status(data.status).json(response)
  	} else {
	  	res.status(data.status).json(response)
  	}
  }
}
