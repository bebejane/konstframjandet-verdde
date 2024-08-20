import s from './Logo.module.scss'
import cn from 'classnames'
import { usePage } from '/lib/context/page'
import Link from 'next/link'

export default function Logo() {
  const { isHome } = usePage()

  return (
    <div className={cn(s.container, isHome && s.home)}>
      <Link href={'/'}><img src="/images/logo.png"></img></Link>
    </div>
  )
}