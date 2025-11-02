import s from './Card.module.scss'
import cn from 'classnames'
import React from 'react'

export type CardProps = {
  children: React.ReactNode | React.ReactNode[],
  className?: string
}

export default function Card({ children, className }: CardProps) {

  return (
    <div className={cn(s.card, className)}>
      <div className={s.box}>
        {children}
      </div>
    </div>
  )
}