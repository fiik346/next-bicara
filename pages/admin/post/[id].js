import React, { useState, useEffect } from 'react'
import NeedLogin from '../../../components/needlogin'
import dynamic from 'next/dynamic'
import { useSession } from 'next-auth/react'
import slugify from 'slugify'
import { useRouter } from 'next/router'

import 'react-markdown-editor-lite/lib/index.css';
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
});
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
// swr
import useSWR from 'swr'
const fetcher = async url => {
  const res = await fetch(url)
  if(!res.ok) {
    const error = new Error('An error occured while fetching data.')
    error.status = res.status
    error.info = await res.json()
    throw error
  }
  return res.json()
}

export default function EditPost() {

  const fetcher = async url => {
    const res = await fetch(url)
    if(!res.ok) {
      const error = new Error('An error occured while fetching data.')
      error.status = res.status
      error.info = await res.json()
      throw error
    }
    return res.json()
  }

  // Router
  const router = useRouter()
  const { id } = router.query
  const url = `/api/post/${id}`
  // Get Data from Server
  const { data, error } = useSWR(`/api/post/${id}`, fetcher)

  // Set Data
	const { data: session, status } = useSession()
  const [isError, setIsError] = useState(false)
	const [title, setTitle] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [slug, setSlug] = useState(null)
  const [canSlug, setCanSlug] = useState(false)
  const [description, setDescription] = useState(null)
  const [draft, setDraft] = useState(null)
	const [value, setValue] = useState('')
  const [canPost, setCanPost] = useState(true)
    
  // Handle Content Value
	function handleValue({ html,text }) {
		setValue(text)
	}

  // Handle Title Value
  const handleTitle = (value) => {
    setTitle(value)
  }


  // Set header, get accesstoken for pass user write to database
  const headers = {
    "token": session ? session.user.sessionToken: ''
  }

  useEffect( () => {
    if(data){
      handleTitle(data.title)
      setThumbnail(data.thumbnail)
      setSlug(data.slug)
      setDescription(data.description)
      setValue(data.content)
      setDraft(data.draft)
    }
  }, [data])

  // Data for POST to database
  const dataPost = {
    title,
    thumbnail,
    description,
    content: value,
    draft,
  }

  // Validate Form
  const validateForm = async () => {
    if(!title) {
      setCanPost(false)
      setIsError({message: "Title is required"})
    }
    else if(!value){
      setCanPost(false)
      setIsError({message: "Content is required"})
    }
    else {
      setCanPost(true)
      setIsError(false)
    }
  }

  // Handling Update
  const handleUpdate = async (event)  => {
    event.preventDefault()
    validateForm()
    if(canPost){
      const res = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(dataPost)
      })

      const result = await res.json()
      if(res.ok && !error){
        router.push('/admin/post')
      }
    }
  }
	return (
		<>
		{ status === 'authenticated' && data ?
		<form onSubmit={handleUpdate} className="my-4 flex flex-col md:flex-row">

      {isError && isError.message && <div className="text-sm sticky top-12 mb-4 z-10 border border-red-200 p-4 text-gray-500 shadow shadow-red-300 bg-white rounded-lg"><p>{error.message}<span className="absolute right-1 top-1" onClick={()=>setError(false)}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></span></p></div>}
			<div className="mb-4 md:w-4/12 md:pl-2 md:order-2">
        <div className="mb-4">
          <h2 className="text-sm text-gray-600 mb-2">Title</h2>
  				<input type="text" className="text-sm  border text-gray-600 w-full px-4 py-2 rounded-lg focus:outline-blue-600" value={title} placeholder="Example Title" onChange={(text) => handleTitle(text.target.value)}/>
        </div>
        <div className="mb-4">
          <h2 className="mb-2 text-gray-600 text-sm">Thumbnail Url</h2>
  				<input type="text" className="text-sm border text-gray-600 rounded-lg px-4 py-2 w-full focus:outline-blue-600" id="thumbnail" placeholder="https://" value={thumbnail} onChange={(input)=>setThumbnail(input.target.value)}/>
        </div>
        
        <div className="mb-4">
          <h2 className="mb-2 text-sm text-gray-600">Slug</h2>
          <div className="relative flex">
			  	  <input type="text" className="text-sm border text-gray-600 w-full pl-4 py-2 pr-12 rounded-lg focus:outline-none bg-gray-200" placeholder="example-slug" value={data.slug} readOnly/>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="mb-2 text-sm text-gray-600">Description</h2>
  				<textarea placeholder="Example Description" className="w-full border px-4 py-2 text-sm text-gray-600 rounded-lg focus:outline-blue-600" value={description} onChange={(input)=>setDescription(input.target.value)}/>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="text-gray-600 mr-2 text-sm">Published</h2>
          <span onClick={() => setDraft(!draft)}className={`relative flex items-center rounded-full h-5 w-12 cursor-pointer ${draft ? 'bg-red-200' : 'bg-green-200'}`}>
      <span className={`absolute block h-6 w-6 rounded-full duration-300 ${draft ? 'bg-red-300 right-6' : 'bg-green-300 right-0'}`}></span>
      </span>
        </div>
			</div>
			<div className="md:order-1 md:pr-2 md:w-8/12">
				<MdEditor style={{ height: '500px' }} value={value} renderHTML={(text) => { return (<ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>)}} onChange={handleValue} view={{ menu: true, md: true, html: false }} markdownClass="relative text-sm border rounded-lg" htmlClass="prose prose-sm"/>
      <div className="mt-4">
        <button className="bg-blue-600 px-4 py-2 text-white rounded-lg text-sm mr-2"> Update </button>
      </div>
			</div>
		</form>
		: status === "unauthenticated" && <NeedLogin />
		}
		</>
	)
}
