import { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { modalOpenedByName, modalPropsByName, toggleModal } from '../store/modal'

export const useModal = (name: string): [boolean, any, Function] => {
  const dispatch = useDispatch()
  const openedSelector = useMemo(() => modalOpenedByName(name), [name])
  const propsSelector = useMemo(() => modalPropsByName(name), [name])

  const opened = useSelector(openedSelector)
  const props = useSelector(propsSelector)
  const close = useCallback((props: any) => {
    dispatch(toggleModal({
      on: !opened,
      name,
      props
    }))
  }, [dispatch, opened, name])

  return [opened, props, close]
}
