import Link from 'next/link'
export default function Footer() {
	return (
		<footer className="border-t py-8 mt-auto">
			<div className="px-4 mx-auto container">
        <div className="text-center">
          <Link href="/about">About</Link>
        </div>
			</div>
		</footer>
	)
}
