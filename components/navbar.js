import React, {useState} from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import { usePopper } from 'react-popper'
import Navigations from './navigations'
function Navbar(){

	//Popper Button
	const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

	// Hamburger Menu
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
		setIsPopperOpen(false)
	}, [router.asPath])
	
	const brand = process.env.BLOG_TITLE || 'Bicara'

	const [isPopperOpen, setIsPopperOpen] = useState(false)

	return (
		<>
			<header className="bg-white border-b sticky top-0 z-20">
				<nav className="flex container mx-auto px-4 py-2 items-center flex-wrap">
					<Link href="/">
						<a className="text-xl order-1 font-bold mr-auto rounded text-gray-800 w-14 h-8 relative block"><Image src="/bicara.svg" className="rounded w-auto h-8 mr-1" layout="fill" alt={brand} title={brand}/></a>
					</Link>

					<ul className={`duration-300 delay-300 order-last flex-col lg:flex lg:flex-row lg:w-auto lg:order-2 mt-4 lg:mt-0 items-center overflow-hidden w-full${menu?' flex':' hidden'}`}>
						<Navigations />	
					</ul>

					{ status === 'unauthenticated' ? (<button onClick={()=>{signIn()}} aria-label="Login button" className="duration-300 rounded-lg bg-blue-600 text-white px-4 py-2 mr-1 hover:bg-blue-100 hover:text-blue-600 border border-blue-600 notap text-sm order-3">Login</button>)
						:
					status === 'authenticated' ? (<div className="duration-300 rounded-lg text-gray-800 mr-1 ml-4 notap order-3 p-1 relative flex items-center">
						<button className="hover:text-blue-600" onClick={() => setIsPopperOpen(!isPopperOpen)}>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
</svg>
							</button>
							<ul className={`absolute bg-white rounded border py-2 text-sm top-full right-0 z-20 ${isPopperOpen?'':' hidden'}`}>
								<li>
									<Link href="/account">
										<a className="hover:text-blue-600 px-4 py-1 flex">Account</a>
									</Link></li>
								<li>
									<Link href="/admin">
										<a className="hover:text-blue-600 px-4 py-1 flex">Admin</a>
									</Link>
								</li>
								<li><span className="cursor-pointer px-4 py-1 hover:text-blue-600 flex" onClick={() => signOut()}>Log Out</span></li>
							</ul>
						</div>)
						:
					status === 'loading' && (<span className="duration-300 mr-1 order-3 p-1"><span className="w-6 h-6 bg-gray-200 rounded-full block"></span></span>)
					}
			
					<button className="p-1 notap order-4 mr-1 lg:mr-0">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
					</button>

					<button onClick={handleMenu} className="flex p-1 notap order-5 lg:hidden pr-0">
						<span className="sr-only">Menu</span>
						<span className="flex items-center w-6 h-6 justify-center relative">
							<span className={`duration-300 block absolute w-full border-b-2 border-gray-800 ${menu?'-rotate-45 top-[46%]':'top-1'}`}></span>
							<span className={`duration-300 block absolute border-b-2 border-gray-800 ${menu?'w-0':'w-full'}`}></span>
							<span className={`duration-300 block absolute w-full border-b-2 border-gray-800 ${menu?'rotate-45 bottom-[46%]':'bottom-1'}`}></span>
						</span>
					</button>
				</nav>
			</header>
		</>
	)
}
export default Navbar
