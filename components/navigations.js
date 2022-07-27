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
						<Link href={item.href}><a className="py-2 flex px-4 notap hover:text-indigo-600">{item.name}</a></Link>
					</li>
			)}
		</>
	)
}
