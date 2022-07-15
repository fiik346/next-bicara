export async function Fetcher(url) {
  const res = await fetch(url)
  if(!res.ok) {
    const error = new Error('An error occured while fetching data.')
    error.status = res.status
    error.info = await res.json()
    throw error
  }
  const data = await res.json()
  console.log(res)
  return data
}
