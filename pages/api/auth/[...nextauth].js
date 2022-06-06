import CredentialsProvider from 'next-auth/providers/credentials'
import WordpressProvider from "next-auth/providers/wordpress";
import NextAuth from 'next-auth'
export default NextAuth({
providers: [
	/*CredentialsProvider({
		name: 'Credentials',
		credentials: {
			username: { label: 'Username', type: 'text', placeholder: 'Username' },
			password: { label: 'Password', type: 'password', placeholder: 'Password'}
		},
		async authorize(credentials, req) {
			const res = await fetch(process.env.API_URL+'/login',{
				method: 'POST',
				headers: {
					'X-Parse-Application-Id': process.env.APP_ID,
					'X-Parse-REST-API-Key': process.env.NEXTAUTH_SECRET,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(credentials),
			})
			const user = await res.json()
			console.log(user)
			if(res.ok && user){
				return user
			}
			return null
		}
	}),*/
	WordpressProvider({
		clientId: '79173',
		clientSecret: 'hZjG4nH2YwyUe7exiZKUtVJHt0KQQ3JUNknCEEg49rywDg5sh8vDbSEjVnqQihB3',
		blog: 'bicara346.wordpress.com',
		scope: 'global'
	})
],
//	callbacks: {
//	}
})
