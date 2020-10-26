import { useDispatch as useBaseDispatch } from 'react-redux'

import { AppDispatch } from '../store/typings.d'

export const useDispatch = () => {
  return useBaseDispatch<AppDispatch>()
}
