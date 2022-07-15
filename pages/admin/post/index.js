import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'

import moment from 'moment'

export default function PostIndex(){

  const fetcher = (...args) => fetch(...args).then((res) => res.json())

  const {data, error} = useSWR('/api/posts?where={}', fetcher)
  return (
    <>
      <div className="my-4">
        <div className="mb-4 flex"> 
          <form className="mr-2">
            <input name="q" type="search" className="text-sm border focus:outline-none px-4 py-2 rounded-lg w-full" placeholder="Search here"></input>
          </form>
          <a className="bg-blue-600 border border-blue-600 text-white text-sm rounded-lg px-4 py-2 hover:bg-blue-100 hover:text-blue-600 ml-auto">New Post</a></div>
        <div className="grid grid-cols-1 gap-2">
          {data && data.map((post,i)=>{
            return(
              <div key={i} className="p-2 text-sm relative flex rounded-lg border cursor-pointer">
                <div className="w-12">
                  {post.thumbnail ?
                    <div className="w-12 h-12">
                      <Image src={post.thumbnail} height="128" width="128" alt={post.title} className="rounded w-auto h-12 w-12"/>
                    </div>
                    :
                    <div className="h-12 w-12 rounded border flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-400">{post.title.split('')[0].toUpperCase()}</span>
                    </div>
                  }
                </div>
                <div className="pl-4 w-full text-gray-600">
                  <h1 className="font-semibold text-md line-clamp-1"><Link href={`/admin/post/${post.objectId}`}>
                    <a className="stretch-link notap">{post.title}</a></Link></h1>
                  <p><span className={post.draft ? 'text-red-500': 'text-green-500'}>{post.draft ? 'Draft' : 'Publish'}</span> - <time>{moment(post.createdAt).format('D MMM YYYY')}</time></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
