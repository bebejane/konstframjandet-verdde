import s from './PageHeader.module.scss'
import cn from 'classnames'
import React from 'react'
import { usePage } from '/lib/context/page'

export type Props = {
  header: string,
  headerSmi: string,
  content: string,
}

export default function PageHeader({ header, headerSmi, content }: Props) {

  const { isHome, } = usePage()

  return (
    <header className={cn(s.header, isHome && s.home)}>
      <h1>{headerSmi}</h1>
      <h1>{header}</h1>
      <p>{content}</p>
    </header>
  )
}