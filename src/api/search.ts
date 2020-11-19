export const search = async (searchPrefix: string) => {
  const url = new URL(`${process.env.REACT_APP_SEARCH_URL}/api/search.php`)
  url.searchParams.append('searchPrefix', searchPrefix)

  const res = await fetch(url.toString())
  const { results } = await res.json()

  return results
}