import Image from 'next/image'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faGithub} from '@fortawesome/free-brands-svg-icons'
export default function AuthorBelow ({ author, editor }) {

  return (
    <div className="my-6">
      
      {/*<div className="mb-4 w-full bg-gray-200">
        <h3 className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-r-lg inline-flex">Author</h3>
      </div>
      */}
      <div className="flex rounded-lg">
        <div className="w-16">
          <div className="h-16 w-16">
            <Image src={author.avatar} width="256" height="256" className="rounded-full object-cover h-20 w-20" />
          </div>
        </div>
        <div className="ml-4 w-auto">
          <h4 className="font-semibold">{author.name || author.username}</h4>
          <p className="text-gray-600">{author.biodata}</p>
          {/*<div className="flex">
            <a href="/facebook" className="mr-2"><FontAwesomeIcon className="w-6 h-6 text-blue-600" icon={faFacebook}/> <span className="sr-only">Facebook</span></a>
            <a href="/facebook" className="mr-2"><FontAwesomeIcon className="w-6 h-6 text-blue-500" icon={faTwitter}/><span className="sr-only">Twitter</span></a>
            <a href="/facebook" className="mr-2"><FontAwesomeIcon className="w-6 h-6 text-gray-800" icon={faGithub}/><span className="sr-only">Github</span></a>
          </div>*/}
        </div>
      </div>
    </div>
  )
}
