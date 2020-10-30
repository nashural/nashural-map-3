export const geocode = async (geocode: string, kind: string = 'locality') => {
  const url = new URL('https://geocode-maps.yandex.ru/1.x')
  url.searchParams.append('geocode', geocode)
  url.searchParams.append('format', 'json')
  url.searchParams.append('kind', kind)
  url.searchParams.append('results', '5')
  url.searchParams.append('lang', 'ru_RU')
  url.searchParams.append('apikey', '137e6a7f-ee29-403c-be2d-8021680117ab')
  
  const resp = await fetch(url.toString())
  const { response } = await resp.json()

  return response
}