import {loginUser} from '../../lib/api'

export default async function login(req,res){
	if(req.method==='POST'){
		const body = req.body
		const send = {
			username: body.username,
			password: body.password
		}
		const data = await fetch(process.env.API_URL+'/parse/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Parse-Application-Id': process.env.APP_ID,
				'X-Parse-REST-API-Key': process.env.API_KEY,
			},
			body: JSON.stringify(send)
		})
		const response = await data.json()
		res.status(200).json(response)
		console.log(response)
	}

}
