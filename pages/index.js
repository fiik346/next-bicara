import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'
const moment = require('moment')

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {

	const {data, error} = useSWR('/api/posts?order=-createdAt&excludeKeys=content', fetcher)
  return (
    <>
      <Head>
        <title>{ data ? 'Bicara - Bahas Berbagai Macam Cara' : 'Loading...' }</title>
				<meta name="description" content="Membahasa berbagai macam cara"/>
			</Head>
			<main className="container mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
					{data && data.map((post,i) => {
						return(
							<div key={i} className="rounded-lg border hover:shadow-lg duration-150 relative flex flex-col">
								<Link href={'blog/'+post.slug}><a className="block rounded-t-lg overflow-hidden w-full"><Image src={post.thumbnail ? post.thumbnail : '/example.png'} alt={post.title} width="640" height="320"/></a></Link>

								<div className="p-6">
									<div className="mb-2 text-gray-600 text-sm">
									
									<span className="uppercase font-semibold">{moment(post.date).format('MMM YYYY')}</span>
									</div>
									<h2 className="font-bold text-gray-800"><Link href={'blog/'+post.slug}>
										<a className="notap stretch-link">{post.title}</a></Link>
                  </h2>
								</div>
							</div>)
          })}
				</div>
			</main>
		</>
	)
}
