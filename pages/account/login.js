import Link from 'next/link'
function Login(){
	return (
		<div className="px-4 my-8 max-w-lg mx-auto">
			<form className="mb-4" action="/api/login" method="POST">
				<input type="text" name="username" placeholder="Username" className="border-2 border-blue-600 focus:ring focus:outline-none text-sm rounded-lg w-full px-3 py-2 rounded-lg mb-4" />
				<input type="password" name="password" placeholder="Your Password" className="border-2 border-blue-600 focus:ring focus:outline-none text-sm w-full px-3 py-2 rounded-lg mb-4" />
				<input type="submit" className="py-2 text-center rounded-full bg-blue-600 text-white w-full" value="Login" />
			</form>
			<p className="text-center text-gray-600">
				Not have an account? 
				<Link href="/account/register">
					<a className="notap hover:text-blue-600"> Register Now</a>
				</Link>
			</p>
		</div> 
	) 
}

export default Login
