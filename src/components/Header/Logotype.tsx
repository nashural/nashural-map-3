import React, { FC } from 'react'

import { LogotypeProps } from './typings'

import "./desktop.css"

export const Logotype: FC<LogotypeProps> = () => {
  return <a href="//nashural.ru" className="Logotype">
    <img src={`${process.env.PUBLIC_URL || ''}/img/map-logo.png`} alt="Наш Урал" width={35} height={35} />
  </a>
}
