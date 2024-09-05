import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React from 'react'
import { Image } from 'react-datocms/image'
import Link from 'next/link'
import { truncateWords } from '/lib/utils'
import { format } from 'date-fns'
import { DatoMarkdown as Markdown } from 'dato-nextjs-utils/components'

export type Props = {
  image?: FileField
  slug: string
  date?: string
  title: string
  intro?: string
  category?: string
  titleLength?: number
  titleRows?: number
  city?: string
}

export default function Thumbnail({ image, slug, title, titleLength, titleRows = 3, category, date, intro, city }: Props) {

  return (
    <Link href={slug} className={s.thumbnail}>
      {category && <div className="tag">{category}</div>}
      <h3 className={cn(s[`rows-${titleRows}`])}>
        <span>
          {titleLength ? truncateWords(title, titleLength) : title}
        </span>
      </h3>
      {date && <h5 className="small">{format(new Date(date), 'yyyy-MM-dd')}</h5>}
      {city && <h5 className="small">{city}</h5>}
      {image &&
        <div className={s.imageWrap}>
          <>
            <Image
              data={image.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
            /><div className={s.border}></div>
          </>
        </div>
      }
      <Markdown className={cn(s.intro, "small")}>{intro}</Markdown>

    </Link>
  )
}