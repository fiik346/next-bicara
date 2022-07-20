import React, { useState, useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const fetcher = (url, token) => fetch(url, {headers: {"token":token}}).then((res)=>res.json())

export default function AccountIndex() {

  const router = useRouter()

  //User Data
	const {data: session, status} = useSession()

  const [name, setName] = useState('')
  const [biodata, setBiodata] = useState('')


  useEffect( async ()=>{
    const res = await fetch('/api/users/me',{
      method: 'PUT',
      headers: { 
        "token": session ? session.user.sessionToken : ''
      },
      body: JSON.stringify({ name, biodata })
    })
    const data = await res.json()
    console.log(data)
    if(session && res.ok){
      setName(data.name)
      setBiodata(data.biodata)
    }
  },[])

  const body = { name, biodata }
  // save data
	const saveData = async (event) => {
    const res = await fetch(`/api/user/${session.user.objectId}`, {
      method: 'PUT',
      headers: {
        "token": session.user.sessionToken
      },
      body: JSON.stringify(body)
    })
    const result = await res.json()
    if(res.ok){
      alert(result)
    }
	}
	return (
		<div>
		{session && <div className="my-4 p-4 rounded-lg bg-blue-300 text-gray-600 font-semibold">Welcome {session.user.username}</div>}
		{session?
			<form onSubmit={saveData}>
				<div className="my-4">
					<h4 className="mb-2 font-semibold">Name</h4>
					<input className="px-4 py-2 w-full border rounded-lg" type="text" value={name} placeholder="Full Name" onChange={(text)=>setName(text.target.value)}/>
				</div>
				<div className="my-4">
					<h4 className="mb-2 font-semibold">Bio</h4>
					<textarea placeholder="Add biodata" value={biodata} className="w-full px-4 py-2 h-16 rounded-lg border" onChange={(text)=>setBiodata(text.target.value)} />
				</div>
				<button className="px-4 py-2 bg-blue-600 text-white rounded-lg notap border border-blue-600 hover:bg-blue-100 hover:text-blue-600">Save</button>
			</form>
				: status === 'unauthenticated' && <div className="bg-red-300 text-gray-600 p-4 my-4 rounded-lg">Login for access your account</div>}
		
		</div>
	)
}
