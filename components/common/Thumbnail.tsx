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
  slug?: string
  date?: string
  endDate?: string
  title?: string
  intro?: string
  category?: string
  titleLength?: number
  titleRows?: number
  city?: string
  className?: string // Add className prop
}

export default function Thumbnail({
  image,
  slug,
  title,
  titleLength,
  titleRows = 3,
  category,
  date,
  endDate,
  intro,
  city,
  className // Add className prop
}: Props) {

  const isTextOnly = !title && !image && !slug

  const content =
    <>
      {category && <div className="tag">{category}</div>}
      {title &&
        <h3 className={cn(s[`rows-${titleRows}`])}>
          <span>
            {titleLength ? truncateWords(title, titleLength) : title}
          </span>
        </h3>
      }
      {date && !endDate &&
        <h4 suppressHydrationWarning={true}>{
          format(new Date(date), 'dd MMM yyyy').replaceAll('.', '')}
        </h4>
      }
      {date && endDate &&
        <h4 suppressHydrationWarning={true}>
          {format(new Date(date), 'd MMM').replaceAll('.', '')} — {format(new Date(endDate), 'dd MMM yyyy').replaceAll('.', '')}
        </h4>
      }
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
      <Markdown className={cn(s.intro, isTextOnly && s.text, isTextOnly && "headline")}>{intro}</Markdown>
    </>

  return slug ?
    <Link href={slug} className={cn(s.thumbnail, className)}> {/* Merge className */}
      {content}
    </Link>
    : <div className={cn(s.thumbnail, className)}> {/* Merge className */}
      {content}
    </div>

}