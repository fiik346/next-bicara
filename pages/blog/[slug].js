import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import useSWR from 'swr'
import moment from 'moment'
import Error from '../_error'
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

export default function BlogPost() {
	const router = useRouter()
	const { slug } = router.query
	const { data, error } = useSWR(`/api/post/slug/${slug}` , fetcher)

	return(
		<div className="my-4">
			<Head><title>{data && data.title +' - Bicara'}</title></Head>
			{error && <Error statusCode={error.status} />}
      {data &&
        <div>
          <div className="mb-4">
            <Image src={data.thumbnail ? data.thumbnail : '/example.png'} className="rounded-lg w-full" height="320" width="640"></Image>
          </div>
          <h1 className="text-2xl mb-4 font-semibold">{data.title}</h1>
          <div className="flex">
            <span className="mr-2">{data.author.name ? data.author.name : data.author.username}</span>
            <time>{moment(data.createdAt).format('Do MMMM YYYY')}</time>
          </div>
        </div>
      }
		</div>
	)
}
