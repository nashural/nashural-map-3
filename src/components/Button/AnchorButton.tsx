import React, { FC } from 'react'

import { ButtonProps } from './typings.d'

import './desktop.css'

export const AnchorButton: FC<ButtonProps> = ({ className, ...props }) => {
  // @ts-ignore
  return <a className={`Button ${className || ''}`} {...props} />
}
