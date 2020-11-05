import React, { FC } from 'react'

import { OpenRouterProps } from './typings.d'

import "./mobile.css"

export const OpenRouter: FC<OpenRouterProps> = () => {
  return <button className="OpenRouter mobile">Маршрут</button>
}
