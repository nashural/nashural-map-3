import React, { FC } from 'react'

import { ButtonProps } from './typings.d'

import './desktop.css'

export const Button: FC<ButtonProps> = ({ className, ...props }) => {
  // @ts-ignore
  return <button className={`Button ${className || ''}`} {...props} />
}
