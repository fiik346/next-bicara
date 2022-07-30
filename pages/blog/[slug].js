import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import useSWR from 'swr'
import moment from 'moment'

import Share from '../../components/share'
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
import AuthorBelow from '../../components/authorbelow'
import Breadcrumb from '../../components/breadcrumb'
import AuthorBox from '../../components/author'
import CommentsBox from '../../components/commentsbox'
import LoadingBlog from '../../components/loadingblog'
const URL = process.env.BLOG_URL
export default function BlogPost() {
	const router = useRouter()
	const { slug } = router.query
	const { data, error } = useSWR(`/api/post/slug/${slug}` , fetcher)
  //const { data, error } = { data: false, error: false }
	return(
    <>
		<div className="my-4">
			<Head>
        <title>{data ? data.title + ' - Bicara' : error ? error.status + ' - Error Accured':'Loading..'}</title>
      </Head>
      {error &&
        JSON.stringify(error.info)
      }
      {data &&
        <>
        <div className="mb-8">
          <div className="text-gray-800">
            <Breadcrumb data={[
              { href: '/category/'+data.category.slug,  title: data.category.name },
              { title: data.title}
            ]} />
            <div className="mb-5">
              <h1 className="text-3xl mb-2 font-bold text-gray-800">{data.title}</h1>
              {data.description && <p className="text-lg mb-4 text-gray-800">{data.description}</p>}
            </div>
            <AuthorBox name={data.author.name} avatar={data.author.avatar} date={data.createdAt} readTime={data.readTime.text} /> 
            {data.thumbnail &&<div className="relative pb-[55%] -mx-4">
              <Image src={data.thumbnail} className="" alt={data.title} layout="fill"></Image>
            </div>}
          </div>
          {
            <Share count={0} url={`https://www.bicara.my.id/blog/${data.slug}`} />
          }
          <article className="my-4">
           <div className="prose mx-auto" dangerouslySetInnerHTML={{ __html: data.content}} />
          </article>
        </div>
        <div className="-mx-4 my-6 border-b"/>
        <AuthorBelow author={data.author} />
        <div className="-mx-4 my-6 border-b"/>
        <CommentsBox slug={data.slug} title={data.title}  /> 
        </>
      }

		</div>
    {!data && !error &&
      <LoadingBlog />
    }
    </>
	)
}
