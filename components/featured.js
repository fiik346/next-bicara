import Link from 'next/link'
import useSWR from 'swr'
const fetcher = url => fetch(url).then(res => res.json())
export default function FeaturedBox() {
  const { data, error } = useSWR('/api/posts?where={"draft":false,"featured":true}&limit=1&order=-createdAt&excludeKeys=content', fetcher)
  return (
    <>
    {data && data.length > 0 &&
      <div className="mb-4">
        <div className="text-gray-800 container px-4 mx-auto">
        <h3>Featured Contents</h3>
        <div className="">
          { data.map((item,i) => {
            return (
              <div className="bg-teal-300 p-4 rounded-lg" key={i}>
                
                <h2 className="text-xl">{item.title}</h2>
              </div>
            )})
          }
        </div>
      </div>
      </div>
    }
    </>
  )
}
