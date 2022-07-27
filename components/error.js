import Image from 'next/image'
import Link from 'next/link'
export default function Error({ status= 404, message= `Ups halaman yang kamu tuju tidak dapat ditemukan. Sepertinya telah dihapus atau dipindahkan.` }){
  return (
    <div className="my-8 text-center">
      <Image src="/404.svg" height="320" width="640" />
      <p className="my-8 font-semibold text-gray-600 max-w-md mx-auto">{message}</p>
      <div className="text-sm my-8">
        <Link href="/">
          <a className="button notap mr-4">
          Halaman Awal
          </a>
        </Link>
        <Link href="/p/contact">
          <a className="button notap">
          Contact
          </a>
        </Link>
      </div>
    </div>
  )
}
