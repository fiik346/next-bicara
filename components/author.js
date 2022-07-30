import moment from 'moment'
import Image from 'next/image'
export default function AuthorBox (props){
  return (
    <div className="flex my-4 bg-white">
      <div className="w-12 h-12 rounded-full bg-indigo-400 relative">
        <Image src={props.avatar} alt={props.name} layout="fill" className="rounded-full object-cover" />
      </div>
      <div className="ml-2">
        <span className="text-blue-600">{props.name}</span>
        <div className="text-gray-600 text-sm">
          <time className="">{moment(props.time).format('DD MMM YYYY')}</time> <span className="mx-1">-</span> <span>{props.readTime}</span>
        </div>                   
      </div>
    </div>
  )
}
