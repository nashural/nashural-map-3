import React, { FC, useCallback } from 'react'
import { nanoid } from 'nanoid'

import { useModal } from '../../hooks/useModal'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButtons, ModalClose } from '../modal'
import { Button } from '../../components/Button'

import { useDispatch } from '../../hooks/useDispatch'
import { appendRoute } from '../../store/slices/router'

import { PlacemarkProps } from './typings.d'
import { GeoJSONCoordinates } from '../../typings'

import "./desktop.css"

export const Placemark: FC<PlacemarkProps> = () => {
  const dispatch = useDispatch()
  const [opened, props, toggle] = useModal('placemark')

  const handleClose = useCallback(() => {
    toggle(props)
  }, [props, toggle])

  const handleAddToRoute = useCallback(() => {
    dispatch(appendRoute({
      route: { 
        id: nanoid(),
        name: props.title as string,
        coordinates: props.coordinates as GeoJSONCoordinates,
        immutable: true
      }
    }))
    toggle(props)
  }, [dispatch, props, toggle])

  if (opened) {
    const { title, src, href } = props

    return (
      <Modal>
        <ModalHeader>
          {title}
          <ModalClose onClose={handleClose} />
        </ModalHeader>
        <ModalBody>
          <figure>
            <img className="Placemark-image" src={`https:${src}`} alt={title} />
          </figure>
        </ModalBody>
        <ModalFooter>
          <ModalButtons>
            <Button anchor href={href}>Читать далее</Button>
            <Button onClick={handleAddToRoute}>Добавить как точку маршрута</Button>
          </ModalButtons>
        </ModalFooter>
      </Modal>
    )
  } else {
    return null
  }
}
