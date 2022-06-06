import React, {useState} from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

function Navbar(){
	const [menu, setMenu]= useState(false)
	function handleMenu() {
		setMenu(!menu)
	}
	function closeMenu() {
		setMenu(false)
	}
	
	const { data: user, status } = useSession()

	const router = useRouter()
	useEffect(() => {
		closeMenu()
	}, [router.asPath])
	
	const nav = [
		{
			name: 'Home',
			href: '/'
		},
		{
			name: 'About',
			href: '/p/about'
		},
		{
			name: 'Account',
			href: '/account'
		},
		{
			name: 'Contact',
			href: '/p/contact'
		},
		{
			name: 'Privacy',
			href: '/p/privacy'
		}
	]
	const brand = process.env.BLOG_TITLE || 'Bicara'
	return (
		<>
			<header className="bg-white border-b">
				<nav className="flex container mx-auto px-4 py-2 items-center flex-wrap">
					<Link href="/">
						<a className="text-xl text-gray-700 order-1 font-bold mr-auto relative h-8 flex w-28"><Image src="/bicara.svg" alt={brand} title={brand} layout="fill"/></a>
					</Link>

					<ul className={`duration-300 delay-300 order-last flex-col md:flex md:flex-row md:w-auto md:order-2 mt-4 md:mt-0 items-center overflow-hidden w-full${menu?' flex':' hidden'}`}>
						{nav.map((item,i) => {
							return (
								<li key={i} className="text-gray-600 w-full md:w-auto">
								<Link href={item.href}>
									<a className="py-2 flex md:px-4 notap hover:text-blue-600">{item.name}</a>
								</Link>
								</li>
							)
						})}
					</ul>

					{ status !== 'authenticated' ? (<Link href="/api/auth/signin">
						<a className="duration-300 rounded-lg bg-blue-600 text-white px-4 py-2 mr-2 hover:bg-blue-100 hover:text-blue-600 border border-blue-600 notap text-sm order-3">Login</a>
					</Link>) :
					(<Link href="/admin">
						<a className="duration-300 rounded-lg text-gray-600 mr-2 md:mr-0 ml-4 hover:text-blue-600 notap text-sm order-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
						</a>
						</Link>)
					}

					<button onClick={handleMenu} className="flex p-1 notap order-4 md:hidden">
						<span className="sr-only">Menu</span>
						<span className="flex items-center w-6 h-6 justify-center relative">
							<span className={`duration-300 block absolute w-full border-b-2 border-gray-600 ${menu?'-rotate-45 top-[46%]':'top-1'}`}></span>
							<span className={`duration-300 block absolute border-b-2 border-gray-600 ${menu?'w-0':'w-full'}`}></span>
							<span className={`duration-300 block absolute w-full border-b-2 border-gray-600 ${menu?'rotate-45 bottom-[46%]':'bottom-1'}`}></span>
						</span>
					</button>
				</nav>
			</header>
		</>
	)
}
export default Navbar
