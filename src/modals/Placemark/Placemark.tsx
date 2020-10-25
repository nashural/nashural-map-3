import React, { FC, useCallback } from 'react'

import { useModal } from '../../hooks/useModal'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButtons } from '../modal'
import { Button } from '../../components/Button'

import { PlacemarkProps } from './typings.d'

import "./desktop.css"

export const Placemark: FC<PlacemarkProps> = () => {
  const [opened, props, toggle] = useModal('placemark')

  const handleClose = useCallback(() => {
    toggle(props)
  }, [props, toggle])

  if (opened) {
    const { title, src, href } = props

    return (
      <Modal onClose={handleClose}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <figure>
            <img className="Placemark-image" src={`https:${src}`} alt={title} />
          </figure>
        </ModalBody>
        <ModalFooter>
          <ModalButtons>
            <Button anchor href={href}>Читать далее</Button>
          </ModalButtons>
        </ModalFooter>
      </Modal>
    )
  } else {
    return null
  }
}
