import axios from 'axios'
export default function Test({data}){

	return (
		<pre>{JSON.stringify(data)}</pre>
	)
}
export async function getServerSideProps() {
	const res = await axios.post('http://127.0.0.1:3000/api/user', { "username" :"udin" })
	console.log(res.data)
	return {
		props: {
			data: res.data
		}
	}
}
