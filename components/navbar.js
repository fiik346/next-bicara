import React, { useState , useEffect} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { usePopper } from 'react-popper'
import Navigations from './navigations'
import FeatherIcon from 'feather-icons-react'
const Navbar = () => {

	//Popper Button
	const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

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
		setIsPopperOpen(false)
	}, [router.asPath])
	
	const brand = process.env.BLOG_TITLE || 'Bicara'

	const [isPopperOpen, setIsPopperOpen] = useState(false)

	return (
		<>
			<header className="bg-white border-b sticky top-0 z-20">
				<nav className="flex container mx-auto px-4 py-2 items-center h-14 flex-wrap">
					<Link href="/">
						<a className="text-xl order-1 font-bold mr-auto rounded w-14 h-10 text-indigo-600 relative">
              <Image src="/bicara-s.svg" layout="fill" alt="Bicara" className="object-cover" />
              <span className="sr-only">Bicara</span>
            </a>
					</Link>

					<ul className="hidden lg:flex top-10 h-full lg:order-2 mt-4 items-center">
						<Navigations />	
					</ul>
			
					<button className="p-1 notap order-4 mr-1 lg:mr-0 text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
            <FeatherIcon className="w-6 h-6" icon="search" />
					</button>

					<button onClick={handleMenu} className="flex p-1 notap order-5 lg:hidden pr-0">
						<span className="sr-only">Menu</span>
						<span className="flex items-center w-6 h-6 justify-center relative">
							<span className={`duration-300 block absolute w-full h-[2px] bg-gray-600 rounded-full ${menu?'-rotate-45 top-[46%]':'top-1'}`}></span>
							<span className={`duration-300 block absolute rounded-full h-[2px] bg-gray-600 ${menu?'w-0':'w-full'}`}></span>
							<span className={`duration-300 block absolute w-full rounded-full h-[2px] bg-gray-600 ${menu?'rotate-45 bottom-[46%]':'bottom-1'}`}></span>
						</span>
					</button>
				</nav>
			</header>
      <nav className={`fixed top-0 w-full z-10 transition-all duration-300 pt-14 overflow-hidden bg-white ${menu ? 'h-[100vh]' : 'h-[1vh]' }`}>
        <ul className="container mx-auto h-full overflow-y-auto"><Navigations /></ul>
      </nav>
		</>
	)
}
export default Navbar
