export const search = async (searchPrefix: string) => {
  const url = new URL(`${process.env.SEARCH_PREFIX}/api/search.php`)
  url.searchParams.append('searchPrefix', searchPrefix)

  const res = await fetch(url.toString())
  const { results } = await res.json()

  return results
}