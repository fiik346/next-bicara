import React, { useState } from 'react'
import { useSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
export default function accountIndex() {
	const {data: session, status} = useSession()
	const saveData = async (event) => {

	}
	return (
		<div>
		{session && <div className="my-4 p-4 rounded-lg bg-blue-300 text-gray-600 font-semibold">Welcome {session.user.username}</div>}
		{session?
			<form>
				<div className="my-4">
					<h4 className="mb-2 font-semibold">Name</h4>
					<input className="px-4 py-2 w-full border rounded-lg" type="text" value={session.user.name} placeholder="Full Name"/>
				</div>
				<div className="my-4">
					<h4 className="mb-2 font-semibold">Bio</h4>
					<textarea placeholder="Add biodata" className="w-full px-4 py-2 h-16 rounded-lg border" />
				</div>
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg notap border border-blue-600 hover:bg-blue-100 hover:text-blue-600">Save</button>
			</form>
				: status === 'unauthenticated' && <div className="bg-red-300 text-gray-600 p-4 my-4 rounded-lg">Login for access your account</div>}
		
		</div>
	)
}
