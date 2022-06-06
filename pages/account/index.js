import { useSession } from 'next-auth/react'
export default function accountIndex() {
	const {data: session, status} = useSession()
	return (
		<div>
			<h1>Account is {status}</h1>
			<pre className="overflow-auto">
				{JSON.stringify(session)}
		<br/>
				{JSON.stringify(status)}
			</pre>
		</div>
	)
}
