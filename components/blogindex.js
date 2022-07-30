import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'

export default function BlogIndex({posts}) {
  return (
    <>
      {posts &&
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {posts.map((post, i)=> {
          return (
          <div key={i} className="rounded-lg border hover:shadow-lg duration-150 relative">
            <div className="relative">
              <Link href={'blog/'+post.slug}><a className="block notap rounded-t-lg w-full"><Image src={post.thumbnail
 ? post.thumbnail : '/example.png'} alt={post.title} width="640" height="320" className="rounded-t-lg" /></a></Link>
            </div>
            <div className="p-6">
              <div className="mb-2 text-gray-600 text-sm">
                <Link href={`/category/${post.category.slug}`}><a className="uppercase text-blue-600 mr-2">{post.category.name}</a></Link>
                <span className="">{moment(post.date).format('DD MMMM YYYY')}</span>
              </div>
              <h2 className="font-bold hover:text-gray-800">
                <Link href={'blog/'+post.slug}>
                  <a className="notap">{post.title}</a>
                </Link>
              </h2>
            </div>
          </div>
          )
        })}
      </div>
      }
    </>
  )
}
