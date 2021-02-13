import { Group } from "../typings.d"

const IS_DYNAMIC_BACKEND = false

const getPublicURL = () => {
  return new URL(window.location.protocol + '//' + window.location.host + (process.env.PUBLIC_URL || '/'))
}

export const getGroupsURL = (): URL => {
  let url: URL
  if (IS_DYNAMIC_BACKEND) {
    url = new URL('/groups', process.env.REACT_APP_FEATURES_URL)
  } else {
    url = new URL('/data/groups.json', getPublicURL())
  }
  url.searchParams.set('nonce', process.env.REACT_APP_NONCE as string)
  return url
}

export const getFeaturesURL = (groupId: string): URL => {
  let url: URL
  if (IS_DYNAMIC_BACKEND) {
    url = new URL(`/features/${groupId}`, process.env.REACT_APP_FEATURES_URL)
  } else {
    url = new URL(`/data/${groupId}.json`, getPublicURL())
  }
  url.searchParams.set('nonce', process.env.REACT_APP_NONCE as string)
  return url
}

export const getGroupIconURL = (group: Group): URL => {
  let url: URL
  if (IS_DYNAMIC_BACKEND) {
    url = new URL(group.iconHref)
  } else {
    url = new URL(group.iconHref.replace('/map', getPublicURL().toString()))
  }
  return url
}
