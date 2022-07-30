import React, { useState , useEffect} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import Navigations from './navigations'
import FeatherIcon from 'feather-icons-react'
const Navbar = () => {

	// Hamburger Menu
	const [menu, setMenu]= useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  
  function handleMenu() {
    setMenu(!menu)    
    document.documentElement.classList.toggle('overflow-hidden')

	}
	function closeMenu() {
		setMenu(false)
    document.documentElement.classList.remove('overflow-hidden')
	}
	
	const router = useRouter()
	useEffect(() => {
		closeMenu()
	}, [router.asPath])
	
	const brand = process.env.BLOG_TITLE || 'Bicara'

	return (
		<>
			<header className="bg-white border-b sticky top-0 z-30 text-gray-600">
				<nav className="flex container mx-auto px-4 lg:px-8 py-2 items-center flex-wrap">
					<Link href="/">
						<a className="font-bold mr-auto items-center flex">
                <Image src="/brand.svg" alt="Nurhidayat" height="36" width="36" className="w-8 h-8" />
              <span className="sr-only">Nurhidayat</span>
            </a>
					</Link>

					<ul className="hidden lg:flex top-10 h-full items-center font-semibold mr-4">
						<Navigations />	
					</ul>
			
					<button className="py-2 px-4 notap order-4 rounded-lg duration-300 hover:bg-gray-50 lg:text-white lg:bg-blue-600 lg:hover:bg-blue-700 flex">
            <FeatherIcon className="w-6 h-6" icon="search" />
            <span className="font-semibold ml-1">Search</span>
					</button>

					<button onClick={handleMenu} className="flex p-2 rounded-lg hover:bg-gray-50 notap order-5 lg:hidden ml-2 -mr-2">
						<span className="sr-only">Menu</span>
						<span className="flex items-center w-6 h-6 justify-center relative">
							<span className={`duration-300 block absolute w-full h-[2px] bg-gray-600 rounded-full ${menu?'-rotate-45 top-[46%]':'top-1'}`}></span>
							<span className={`duration-300 block absolute rounded-full h-[2px] bg-gray-600 ${menu?'w-0':'w-full'}`}></span>
							<span className={`duration-300 block absolute w-full rounded-full h-[2px] bg-gray-600 ${menu?'rotate-45 bottom-[46%]':'bottom-1'}`}></span>
						</span>
					</button>
				</nav>
			</header>
      <nav className={`fixed lg:hidden top-0 w-9/12 max-w-sm h-full z-30 transition-all duration-300 overflow-hidden ${menu ? 'left-0' : '-left-full' }`} aria-hidden={!menu}>
        <ul className="container mx-auto h-full overflow-y-auto bg-white w-full pt-14"><Navigations /></ul>
        <div className={`fixed top-0 left-0 right-0 bottom-0 -z-10 bg-black/30 backdrop-blur-sm ${!menu && 'hidden'}`} onClick={closeMenu}/>
      </nav>
		</>
	)
}
export default Navbar
