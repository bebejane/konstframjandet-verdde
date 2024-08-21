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
<<<<<<< HEAD
    <Link href={slug} transformHref={transformHref} className={s.thumbnail}>

=======
    <Link href={slug} className={s.thumbnail}>
      <div className={s.category}>{category}</div>
>>>>>>> 2ca6557 (fixes)
      <h3 className={cn(s[`rows-${titleRows}`])}>
        <span>
          {titleLength ? truncateWords(title, titleLength) : title}
        </span>
      </h3>
<<<<<<< HEAD
      {(strippedIntro || meta) &&
        <div className="thumb-intro">
          <p>
            {meta && <strong>{meta.trim()}</strong>}
            {strippedIntro}
          </p>
        </div>

      }
=======
      <h5>{format(new Date(date), 'yyyy-mm-dd')}</h5>
>>>>>>> 2ca6557 (fixes)
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