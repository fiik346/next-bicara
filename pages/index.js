import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
const moment = require('moment')
import FeaturedBox from '../components/featured'
import BlogIndex from '../components/blogindex'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Home() {

	const {data, error} = useSWR('/api/posts?order=-createdAt&excludeKeys=content&include=category', fetcher)
  return (
    <>
      <Head>
        <title>{ data ? 'Bicara - Bahas Berbagai Macam Cara' : 'Loading...' }</title>
				<meta name="description" content="Membahasa berbagai macam cara"/>
			</Head>

      {/*<FeaturedBox />*/}
			<div className="">
        <BlogIndex posts={data && data} />
			</div>
		</>
	)
}
