import React from 'react'
import { Link } from 'gatsby'

import { DateDisplay } from './DateDisplay'

type ArticleListingProps = {
  slug: string
  title: string
  datePublished: string
  excerpt: string
}

export function ArticleListing({ slug, title, datePublished, excerpt }: ArticleListingProps) {
  return (
    <article>
      <Link to={slug}>
        <h2>{title}</h2>
      </Link>
      <DateDisplay date={datePublished} />
      <p>{excerpt}</p>
    </article>
  )
}
