import s from './Thumbnail.module.scss'
import cn from 'classnames'
import React, { useState } from 'react'
import { Image } from 'react-datocms/image'
import Link from 'next/link'
import { truncateWords } from '/lib/utils'
import { format } from 'date-fns'


export type Props = {
  image?: FileField
  slug: string
  date: string
  title: string
  category: string
  titleLength?: number
  titleRows?: number
}

export default function Thumbnail({ image, slug, title, titleLength, titleRows = 3, category, date }: Props) {

  const [loaded, setLoaded] = useState(false);

  return (
    <Link href={slug} className={s.thumbnail}>
      <div className="tag">{category}</div>
      <h3 className={cn(s[`rows-${titleRows}`])}>
        <span>
          {titleLength ? truncateWords(title, titleLength) : title}
        </span>
      </h3>
      <h5>{format(new Date(date), 'yyyy-mm-dd')}</h5>
      {image &&
        <div className={s.imageWrap}>
          <>
            <Image
              data={image.responsiveImage}
              className={s.image}
              pictureClassName={s.picture}
              onLoad={() => setLoaded(true)}
            /><div className={s.border}></div>
          </>
        </div>
      }
    </Link>
  )
}