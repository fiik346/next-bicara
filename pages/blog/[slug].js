import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import useSWR from 'swr'
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
	const { data, error } = useSWR('https://public-api.wordpress.com/rest/v1.1/sites/bicara346.wordpress.com/posts/slug:' + slug , fetcher)
	return(
		<>
			<Head><title>{data && data.title +' - Bicara'}{error && '404 - Page Not Found'}</title></Head>
			<div>{error && <Error statusCode={error.status} />}</div>
		</>
	)
}
