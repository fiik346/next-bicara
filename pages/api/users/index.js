import axios from 'axios'
import { registerNewUser } from '../../../lib/api'

export default async function handler(req,res) {
	if(req.method === 'GET'){
		res.status(200).json({ request: 'hello' })
	}
	else if( req.method === 'POST') {
		const { body } = req
		const data = await registerNewUser(body)
		if (data.error) {
			res.status(201).json({ error: data.error})
		} else {
			res.status(200).json({  
				data,
				body
			})
			console.log(data)
		}
	}
}
