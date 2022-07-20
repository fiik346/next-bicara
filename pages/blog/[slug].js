import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import useSWR from 'swr'
import moment from 'moment'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Error from '../_error'
const fetcher = async url => {
	const res = await fetch(url)
	if(!res.ok) {
		const error = new Error('An error occured while fetching data.')
		error.status = res.status
		error.info = await res.json()
		throw error
	}
  const result = await res.json()
	return result
}

export default function BlogPost() {
	const router = useRouter()
	const { slug } = router.query
	const { data, error } = useSWR(`/api/post/slug/${slug}` , fetcher)
	return(
		<div className="my-4">
			<Head>
        {data &&<title>{data.title +' - Bicara'}</title>}
      </Head>
      {data &&
        <div>
          <div className="">
            <div className="mb-4">
              <h1 className="text-3xl mb-2 font-bold">{data.title}</h1>
              <div className="flex text-sm mb-4 text-gray-600">
                <p>By <span className="mr-1">{data.author.name ? data.author.name : data.author.username},</span>
                <time>{moment(data.createdAt).format('DD MMMM YYYY')}</time></p>
              </div>
              {data.description && <p className="text-lg mb-4 text-gray-800">{data.description}</p>}
              <div className="flex mb-4 text-gray-500 ">
                <button className="hover:text-blue-600 mr-2">
                  <svg className="fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                </button>
                <button className="mr-2 hover:text-blue-500">
                  <svg className="w-6 h-6 fill-current"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg>
                </button>
                <button className="hover:text-blue-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="w-6 h-6" fill="currentColor"><path d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"/></svg></button>
              </div>
            </div>
            {data.thumbnail &&<div className="relative w-full pb-[60%]">
              <Image src={data.thumbnail} className="rounded-lg w-full" layout="fill"></Image>
            </div>}
          </div>
          <div className="my-4">
           <ReactMarkdown remarkPlugins={[remarkGfm]} className="prose mx-auto">{ data ? data.content : '' }</ReactMarkdown> 
          </div>
        </div>
      }
		</div>
	)
}
