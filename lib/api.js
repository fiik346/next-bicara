const apiUrl = process.env.API_URL

async function fetchAPI(path = '/',query, method = 'GET') {
	
	//header 
	const headers= {
			'Content-Type': 'application/json',
			'X-Parse-Application-Id': process.env.APP_ID,
			'X-Parse-REST-API-Key': process.env.API_KEY
	}

	//fetch post
	if(method === 'POST') {
	const response = await fetch(apiUrl+path, {
		method: 'POST',
		headers,
		body: JSON.stringify(
			query
		)
	})
	
	//results
	const json = await response.json()
	console.log(json)
	console.log(query)
	return json
}
}

export async function registerNewUser (body) {
	const data = await fetchAPI('/users', {
		username: body.username,
		email: body.email,
		password: body.password,
	}, 'POST')
	return data
	console.log(data)
}

export async function loginUser (body) {
	const data = await fetchAPI('/login', {
		username: body.username,
		password: body.password,
	}, 'POST')
}
