import React, { FC } from 'react'

import { ButtonProps } from './typings.d'

import './universal.css'

export const AnchorButton: FC<ButtonProps> = ({ className, ...props }) => {
  // @ts-ignore
  return <a className={`Button ${className || ''}`} {...props} />
}
