import s from './CardContainer.module.scss'
import cn from 'classnames'
import useDevice from '/lib/hooks/useDevice'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

export type Props = {
  children?: React.ReactNode | React.ReactNode[],
  columns?: 2 | 3,
  className?: string
  hideLastOnDesktop?: boolean
  hideLastOnMobile?: boolean
}

export default function CardContainer({ children, className }: Props) {

  const cards = Array.isArray(children) ? children : [children]

  return (
    <ResponsiveMasonry
      className={cn(s.masonry, className)}
      columnsCountBreakPoints={{ 320: 1, 980: 3 }}
    >
      <Masonry>
        {cards}
      </Masonry>
    </ResponsiveMasonry>

  )
}