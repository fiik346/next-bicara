import { signIn } from 'next-auth/react'
export default function NeedLogin(){
	return (
		<div className="p-4 rounded-lg my-8 h-full bg-red-200 text-gray-900">
			<p>Kamu perlu <button onClick={() => signIn()}>Log In</button> terlebih dahulu untuk mengakses halaman ini.</p>
		</div>
	)
}
