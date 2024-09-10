import s from './CardContainer.module.scss'
import cn from 'classnames'
import useDevice from '/lib/hooks/useDevice'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'


export type Props = {
  children?: React.ReactNode | React.ReactNode[],
  columns?: 2 | 3,
  className?: string
  hideLastOnDesktop?: boolean
  hideLastOnMobile?: boolean
}

export default function CardContainer({ children, columns = 3, className, hideLastOnDesktop = false, hideLastOnMobile = false }: Props) {

  const buildRows = () => {
    const cards = Array.isArray(children) ? children : [children]
    const maxColumns = !isDesktop ? 1 : 3
    const totalRows = Math.ceil(cards.length / maxColumns)
    const rows = new Array(totalRows).fill([])

    cards.forEach((card, i) => {
      const row = i % maxColumns
      rows[row] = [...(rows[row] ?? []), card]
    })

    return rows
  }

  const ref = useRef<HTMLDivElement | null>(null)
  const { isDesktop } = useDevice()
  const [rows, setRows] = useState(buildRows())
  const { locale } = useRouter()

  useEffect(() => { setRows(buildRows()) }, [isDesktop, locale])

  return (
    <div ref={ref} className={cn(s.container, className)}>
      {rows?.map((row, i) =>
        <React.Fragment key={i}>
          {row.map((card, j) => card)}
        </React.Fragment>
      )}
    </div>
  )
}