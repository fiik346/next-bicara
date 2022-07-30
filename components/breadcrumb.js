import Link from 'next/link'
export default function Breadrumb({ data }) {
  return (
    <>
      <nav className="my-4">
        <ul className="flex text-sm">
          <li className="after:content-['/'] after:mx-1">
            <Link href="/">
              <a className="text-blue-600">Home</a>
            </Link>
          </li>
          {data.map((item,i) => {
            return (
              <> 
                <li key={i} className="last:line-clamp-1 last:after:content-[''] after:content-['/'] after:mx-1">
                  {i+1 == data.length ? <span>{item.title}</span>
                    :
                    <Link href={`/category/${data.lentgh}`}><a className="text-blue-600">{item.title}</a></Link>
                  }
                </li>
              </>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
