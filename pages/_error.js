import Head from 'next/head'
import Image from 'next/image'
function Error({ statusCode }){
	const statusCodes = {
		400: 'Bad Request',
    404: 'This page could not be found',              405: 'Method Not Allowed',
		500: 'Internal Server Error'
	};

	return (

		<div className="my-16 text-center">
			<Head>
				<title>{statusCode} - {statusCodes[statusCode]}</title>
			</Head>
  		<Image src="/warning.svg" className="mb-4 w-64 mx-auto" height="320" width="640" alt={statusCodes[statusCode]} />
			<h1 className="font-semibold text-6xl mb-4">{statusCode}</h1>
			<p>{statusCodes[statusCode]}</p>
		</div>
	)
}
Error.getInitialProps = ({ res, err }) => {
	const statusCode = res ? res.statusCode : err ? err.statusCode : 404
	return { statusCode }
}
export default Error
