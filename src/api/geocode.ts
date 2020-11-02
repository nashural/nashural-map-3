export const geocode = async (geocode: string, kind: string = 'locality') => {
  const url = new URL('https://geocode-maps.yandex.ru/1.x')
  url.searchParams.append('geocode', geocode)
  url.searchParams.append('format', 'json')
  url.searchParams.append('kind', kind)
  url.searchParams.append('results', '5')
  url.searchParams.append('lang', 'ru_RU')
  if (process.env.YMAPS_API_KEY) {
    url.searchParams.append('apikey', process.env.YMAPS_API_KEY)
  } else {
    throw new Error('Set YMAPS_API_KEY in .env file')
  }

  const resp = await fetch(url.toString())
  const { response } = await resp.json()

  return response
}