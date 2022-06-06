import dynamic from 'next/dynamic'

let Editor = dynamic(()=>import('../../../components/editor'), { ssr: false})
export default function NewPost() {

	return (
		<div className="my-8 -mx-4 flex flex-col md:flex-row">
			<div className="order-2 p-4 md:order-1 w-full md:w-8/12">
				<Editor />
			</div>
			<div className="order-1 md:order-2 w-full md:w-4/12 p-4">
				<div></div>
			</div>
		</div>
	)
}
