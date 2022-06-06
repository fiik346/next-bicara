import axios from 'axios'
import React from 'react'
import Link from 'next/link'

export default function Register() {
	const [result,setResult] = React.useState({error: false})
	const handleSubmit = async (event) => {

		//stop submitting
		event.preventDefault()

		// get value for post
		const data = {
			username: event.target.username.value,
			email: event.target.email.value,
			password: event.target.password.value
		}

		// convert to json
		const JSONData = JSON.stringify(data)

		//endpoint api
		const endpoint = '/api/users'

		// fetch post using axios
		const response = await axios.post(endpoint, data)
		setResult(response.data)
		
	}
	return (
		<div className="my-8">
		{
			result.error && (<p className="mb-4 py-2 px-4 rounded bg-red-100 text-gray-500">{result.error}</p> )
		}
		{
			result.data && (<p className="py-2 px-4 mb-4 bg-blue-100 text-gray-500 rounded">Your account has been created. <Link href="/account/login">
					<a className="text-blue-700">Login Now</a></Link></p>)
		}
			<form onSubmit={handleSubmit} className="flex flex-col">
				<label htmlFor="username" className="mb-2">Username</label>
				<input id="username" name="username" className="px-3 py-2 rounded-lg border-2 border-blue-600 focus:ring focus:outline-none mb-4 text-sm" type="text" placeholder="username" required/>

				<label htmlFor="email" className="mb-2">Email</label>
				<input id="email" name="email" className="px-3 py-2 rounded-lg border-2 border-blue-600 focus:ring focus:outline-none mb-4 text-sm" type="email" placeholder="mail@awesome.dev" required/>
					
				<label htmlFor="password" className="mb-2">Password</label>
				<p className="relative">
					<input id="password" name="password" className="px-3 py-2 rounded-lg border-2 border-blue-600 focus:ring focus:outline-none mb-4 text-sm relative w-full" type="password" placeholder="Password" minLength="6" required/>
				<span className="absolute right-0 py-2 px-3 texg-gray-600"> <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></span>
		</p>
				<p className="p-4 text-sm font-semibold text-gray-600 bg-yellow-100">By creating acccount, you are accept our <Link href="/p/terms">
		<a className="underline">Terms of Use</a>
		</Link> and <Link href="/acccount/privacy">
		<a className="underline">Privacy Policy</a>
		</Link></p>	
				<input className="py-2 my-4 text-white bg-blue-600 rounded-full text-center notap focus:bg-blue-400 font-semibold" type="submit" value="Register"/>
			</form>
		</ div>
	)	
}
