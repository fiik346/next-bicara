import Link from 'next/link'
export default function Admin() {
	return (
		<div>
			{process.env.NODE_ENV === 'development' && <Link href='/admin/roles'>Role</Link> }
			<Link href='/admin/post'>Post</Link>
		</div>
	)
}
