import React from 'react'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import SEO from 'react-seo-component'

import { Layout } from '../components/Layout'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { ArticleListing } from '../components/ArticleListing'

type TagProps = {
  pageContext: {
    tag: string
  }
  data: {
    allMdx: {
      edges: [
        {
          node: {
            id: string
            excerpt: string
            frontmatter: {
              title: string
              date: string
              cover: {
                childImageSharp: {
                  sizes: FluidObject
                }
              }
            }
            fields: {
              slug: string
            }
          }
        },
      ]
      totalCount: number
    }
  }
}

const Tags = ({ pageContext, data }: TagProps): React.ReactElement => {
  const {
    description,
    title,
    titleTemplate,
    image,
    siteUrl,
    siteLanguage,
    siteLocale,
    twitterUsername,
  } = useSiteMetadata()

  const { tag } = pageContext
  const { edges, totalCount } = data.allMdx
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`

  const posts = edges.map(({ node }) => {
    const { id, excerpt, fields, frontmatter } = node
    return (
      <ArticleListing
        key={id}
        slug={fields.slug}
        title={frontmatter.title}
        datePublished={frontmatter.date}
        excerpt={excerpt}
      />
    )
  })

  return (
    <Layout>
      <SEO
        title={title}
        titleTemplate={titleTemplate}
        description={description}
        image={`${siteUrl}${image}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />

      <StyledTagHeader>{tagHeader}</StyledTagHeader>

      <section>{posts}</section>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query ($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-D")
          }
        }
      }
    }
  }
`

const StyledTagHeader = styled.h3`
  font-size: 0.875rem;
  color: #6c6c6c;
`
