/* eslint-disable import/prefer-default-export */
import { graphql, useStaticQuery } from 'gatsby'

export function useSiteMetadata() {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            titleTemplate
            description
            image
            author
            siteUrl
            siteLanguage
            siteLocale
            twitterUsername
            authorName
          }
        }
      }
    `,
  )
  return site.siteMetadata
}
