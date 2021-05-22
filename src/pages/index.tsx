import React from 'react'
import { graphql, Link } from 'gatsby'
import GatsbyImage, { FluidObject } from 'gatsby-image'
import styled from '@emotion/styled'
import SEO from 'react-seo-component'

import { Layout } from '../components/Layout'
import { useSiteMetadata } from '../hooks/useSiteMetadata'
import { DateDisplay } from '../components/DateDisplay'

const IndexWrapper = styled.main``

const PostWrapper = styled.div``

const Image = styled(GatsbyImage)`
  border-radius: 5px;
`

type Post = {
  id: string
  excerpt: string
  frontmatter: {
    title: string
    date: string
    cover: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  fields: {
    slug: string
  }
}

type HomeProps = {
  data: {
    allMdx: {
      nodes: Post[]
    }
  }
}

const Home = ({ data }: HomeProps): React.ReactElement => {
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

  const posts = data.allMdx.nodes.map(({ excerpt, frontmatter, fields, id }) => (
    <PostWrapper key={id}>
      <Link to={fields.slug}>
        {/* {frontmatter.cover ? <Image fluid={frontmatter.cover.childImageSharp.fluid} /> : null} */}
        <h2>{frontmatter.title}</h2>
      </Link>
      <DateDisplay date={frontmatter.date} />
      <p>{excerpt}</p>
    </PostWrapper>
  ))

  return (
    <Layout>
      <SEO
        title={title}
        titleTemplate={titleTemplate}
        // titleSeparator="-"
        description={description}
        image={`${siteUrl}${image}`}
        pathname={siteUrl}
        siteLanguage={siteLanguage}
        siteLocale={siteLocale}
        twitterUsername={twitterUsername}
      />
      <IndexWrapper>{posts}</IndexWrapper>
    </Layout>
  )
}

export default Home

export const query = graphql`
  query SITE_INDEX_QUERY {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { eq: true } } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "YYYY-MM-D")
          cover {
            publicURL
            childImageSharp {
              fluid(maxWidth: 2000, traceSVG: { color: "#639" }) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        fields {
          slug
        }
      }
    }
  }
`
