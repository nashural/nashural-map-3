export const search = async (searchPrefix: string) => {
  const url = new URL('http://localhost:3001/api/search.php')
  url.searchParams.append('searchPrefix', searchPrefix)

  const res = await fetch(url.toString())
  const { results } = await res.json()

  return results
}