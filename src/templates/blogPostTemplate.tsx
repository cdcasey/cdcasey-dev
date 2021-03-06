import React from 'react'
import { graphql, Link } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'react-seo-component'

import { Layout } from '../components/Layout'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { DateDisplay } from '../components/DateDisplay'

type PostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string
        date: string
        cover: {
          publicURL: string
        }
      }
      body: string
      excerpt: string
      fields: {
        slug: string
      }
    }
  }
  pageContext: {
    previous: {
      fields: { slug: string }
      frontmatter: { title: string }
    }
    next: {
      fields: { slug: string }
      frontmatter: { title: string }
    }
  }
}

export default function Post({ data, pageContext }: PostProps): React.ReactElement {
  const { image, siteUrl, siteLanguage, siteLocale, twitterUsername, authorName, titleTemplate } =
    useSiteMetadata()

  const { frontmatter, body, excerpt, fields } = data.mdx
  const { previous, next } = pageContext

  return (
    <Layout>
      <SEO
        title={frontmatter.title}
        titleTemplate={titleTemplate}
        description={excerpt}
        image={
          frontmatter.cover === null
            ? `${siteUrl}${image}`
            : `${siteUrl}${frontmatter.cover.publicURL}`
        }
        pathname={`${siteUrl}${fields.slug}`}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
        author={authorName}
        article
        datePublished={frontmatter.date}
        dateModified={new Date(Date.now()).toISOString()}
      />
      <article>
        <h2>{frontmatter.title}</h2>
        <DateDisplay date={frontmatter.date} />
        <MDXRenderer>{body}</MDXRenderer>
      </article>
      <section>
        {next && (
          <Link to={next.fields.slug}>
            <p>next: {next.frontmatter.title}</p>
          </Link>
        )}
        {previous && (
          <Link to={previous.fields.slug}>
            <p>prev: {previous.frontmatter.title}</p>
          </Link>
        )}
      </section>
    </Layout>
  )
}

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY-MM-D")
        cover {
          publicURL
        }
      }
      body
      excerpt
      fields {
        slug
      }
    }
  }
`
