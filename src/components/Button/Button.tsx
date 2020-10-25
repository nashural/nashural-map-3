import React, { FC } from 'react'

import { ButtonProps } from './typings.d'

import './desktop.css'

export const Button: FC<ButtonProps> = ({ anchor, href, children, className, onClick }) => {
  if (anchor) {
    // @ts-ignore
    return <a href={href} className={`{Button ${className}`} onClick={onClick}>{children}</a>
  } else {
    // @ts-ignore
    return <button className={`Button ${className}`} onClick={onClick}>{children}</button>
  }
}
