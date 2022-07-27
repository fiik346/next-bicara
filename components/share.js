import FeatherIcon from 'feather-icons-react'

export default function Share({ url, count = 0 }){
  return (
    <div className="flex items-center my-4 text-gray-500">
      <a href="#comments" className="flex items-center px-3 py-2 bg-gray-200 rounded-lg">
        <span className="mr-2">{count}</span>
        <span className="sr-only">Comments</span>
        <FeatherIcon icon="message-square" />
      </a>
      <a className="mr-2 ml-auto bg-gray-200 p-2 rounded-lg">
        <FeatherIcon icon="linkedin" className="w-6 h-6"/>
      </a>
      <a href={`https://twitter.com/share?url=${url}`} className="mr-2 bg-gray-200 p-2 rounded-lg">
        <FeatherIcon icon="twitter" className="w-6 h-6"/>
      </a>
      <a href={`https://facebook.com/sharer.php?u=${url}`} className="bg-gray-200 p-2 rounded-lg">
        <FeatherIcon icon="facebook" className="w-6 h-6"/>
      </a>
    </div>
  )
}
