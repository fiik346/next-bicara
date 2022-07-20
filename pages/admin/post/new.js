import React, { useState } from 'react'
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
export default function NewPost() {

  // Set Data
	const { data: session, status } = useSession()
  const [error, setError] = useState(false)
	const [title, setTitle] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [slug, setSlug] = useState('')
  const [canSlug, setCanSlug] = useState(false)
  const [description, setDescription] = useState('')
	const [value, setValue] = useState('')
  const [canPost, setCanPost] = useState(false)

  const router = useRouter()

  // Handle Content Value
	function handleValue({ html,text }) {
		setValue(text)
	}

  // Handle can Auto slug or not
  const changeCanSlug = () => {
    if(canSlug){
      handleSlug(slugify(title, { lower: true}))
    }
    else {
      setCanSlug(true)
    }
  }

  // Handle Slug Value
  const handleSlug = async (isSlug) => {
    setSlug(isSlug)
    const res = await fetch('/api/checkSlug?slug='+isSlug)
    const result = await res.json()
    if(!result.slug){
      setError({message: `Slug ${isSlug} telah dipakai, gunakan yang lain!`})
    setCanPost(false)
    }
    else{
      setError(false)
      setCanPost(true)
    }
  }

  // Handle Title Value
  const handleTitle = (event) => {
    setTitle(event.target.value)

    // Automatic Slug from Title
    if(!canSlug){
      handleSlug(slugify(event.target.value, {
        lower: true,
      }))
    }
  }

  // Set header, get accesstoken for pass user write to database
  const headers = {
    "token": session ? session.user.sessionToken: ''
  }

  // Data for POST to database
  const dataPost = {
    title,
    slug,
    thumbnail,
    description,
    content: value,
    author: {
      "__type": "Pointer",
      "className": "_User",
      "objectId": session ? session.user.objectId : ''
    }
  }

  // Validate Form
  const validateForm = async () => {
    if(!title) {
      setError({message: "Title is required"})
    }
    else if(!slug){
      setError({ message: "Slug is required" })           }
    else if(!value){
      setError({message: "Content is required"})
    }
    else {
      const res = await fetch('/api/checkSlug?slug='+slug)
      const result = await res.json()
      setError(true)
      console.log(result)
      if(!result.slug){
        setError({message: "Slug telah dipakai, ganti dengan yang lain"})
      }
      else {
        setError(false)
      }
    }
  }

  // Handling Publish
  const handlePublish = async (event)  => {
    dataPost.draft = false;
    event.preventDefault()
    validateForm()
    if(canPost){
      const res = await fetch('/api/post/new', {
        method: 'POST',
        headers,
        body: JSON.stringify(dataPost)
      })

      const result = await res.json()
      if(res.ok && !error){
        router.push('/admin/post')
      }
    }
  }

  // Handling Draft
  const handleDraft = async () => {
    validateForm()
    const res = await fetch('/api/post/new', {
      method: 'POST',
      headers,
      body: JSON.stringify(dataPost)
    })
    return res
  }
	return (
		<>
		{ status === 'authenticated' ?
		<form onSubmit={handlePublish} className="my-4 flex flex-col md:flex-row">

      {error && error.message && <div className="text-sm sticky top-12 mb-4 z-10 border border-red-200 p-4 text-gray-500 shadow shadow-red-300 bg-white rounded-lg"><p>{error.message}<span className="absolute right-1 top-1" onClick={()=>setError(false)}><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-300" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg></span></p></div>}
			<div className="mb-4 md:w-4/12 md:pl-2 md:order-2">
        <div className="mb-4">
          <h2 className="text-sm text-gray-600 mb-2">Title</h2>
  				<input type="text" className="text-sm  border text-gray-600 w-full px-4 py-2 rounded-lg focus:outline-blue-600" value={title} placeholder="Example Title" onChange={handleTitle}/>
        </div>
        <div className="mb-4">
          <h2 className="mb-2 text-gray-600 text-sm">Thumbnail Url</h2>
  				<input type="text" className="text-sm border text-gray-600 rounded-lg px-4 py-2 w-full focus:outline-blue-600" id="thumbnail" placeholder="https://" value={thumbnail} onChange={(input)=>setThumbnail(input.target.value)}/>
        </div>
        
        <div className="mb-4">
          <h2 className="mb-2 text-sm text-gray-600">Slug</h2>
          <div className="relative flex">
			  	  <input type="text" className={`text-sm border text-gray-600 w-full pl-4 py-2 pr-12 rounded-lg${!canSlug ? ' bg-gray-200 focus:outline-none' : ' bg-white focus:outline-blue-600'}`} placeholder="example-slug" value={slug} onChange={(input)=>handleSlug(input.target.value)} required readOnly={!canSlug} pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$" autoCapitalize="none"/>
            <span onClick={changeCanSlug}className="right-0 p-2 cursor-pointer border border-blue-600 bg-blue-600 text-white rounded-r-lg absolute">
              {!canSlug ? <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg> }
            </span>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="mb-2 text-sm text-gray-600">Description</h2>
  				<textarea placeholder="Example Description" className="w-full border px-4 py-2 text-sm text-gray-600 rounded-lg focus:outline-blue-600" value={description} onChange={(input)=>setDescription(input.target.value)}/>
        </div>
			</div>
			<div className="md:order-1 md:pr-2 md:w-8/12">
				<MdEditor style={{ height: '500px' }} value={value} renderHTML={text => <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>} onChange={handleValue} view={{ menu: true, md: true, html: false }} markdownClass="relative text-sm border rounded-lg" htmlClass="prose prose-sm"/>
      <div className="mt-4">
        <button className="bg-blue-600 px-4 py-2 text-white rounded-lg text-sm mr-2">Publish</button>
        <span onClick={handleDraft} className="border rounded-lg cursor-pointer bg-white text-gray-600 px-4 py-2 hover:outline-blue-600">Save</span>
      </div>
			</div>
		</form>
		: status === "unauthenticated" && <NeedLogin />
		}
    {/*<h2 className="font-bold">Title</h2>
      {title}
    <h2 className="font-bold">Thumbnail</h2>
    {thumbnail}
    <h2 className="font-bold">Slug</h2>
    {slug}
    <h2 className="font-bold">Description</h2>
    {description}*/}
		</>
	)
}
