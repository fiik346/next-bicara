import Link from 'next/link'

export default function Navigations() {
	const navs = [
		{
			name: 'Home',
			href: '/',
		},
		{
			name: 'About',
			href: '/p/about'
		},
		{                                      
      name: 'Contact',
      href: '/p/contact'   
    },
     {
      name: 'Privacy',
      href: '/p/privacy'
    },
 ]
	return (
		<>
			{navs.map((item,i) => 
					<li key={i} className="text-gray-600 w-full lg:w-auto">
						<Link href={item.href}><a className="py-2 flex px-6 md:px-4 notap hover:bg-gray-50 hover:text-blue-600 md:rounded-lg">{item.name}</a></Link>
					</li>
			)}
		</>
	)
}
