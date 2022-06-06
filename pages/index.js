import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {

	const {data, error} = useSWR('https://public-api.wordpress.com/rest/v1.1/sites/bicara346.wordpress.com/posts', fetcher)
  return (
    <>
      <Head>
        <title>Bicara - Bahas Berbagai Macam Cara</title>
				<meta name="description" content="Membahasa berbagai macam cara"/>
			</Head>
			<main className="container mx-auto">
				<div className="grid grid-cols-1">
					{data && data.posts.map((post,i) => {
					return(
						<div key={i}>
							{post.featured_image && <Image src={post.featured_image} width="600" height="300"/>}
							<h2>{post.title} {post.format}</h2>
						</div>
					)
					})}
				</div>
			</main>
		</>
	)
}
