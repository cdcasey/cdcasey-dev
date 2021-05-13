import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import styled from '@emotion/styled'
// eslint-disable-next-line import/no-extraneous-dependencies
import kebabCase from 'lodash/kebabCase'

const StyledLink = styled(Link)`
  &:hover,
  &:link,
  &:visited {
    text-decoration: none;
  }
`

const StyledH1 = styled.h1`
  color: #6c6c6c;
  text-align: center;
  margin-bottom: 0.2rem;
`

StyledH1.defaultProps = { className: 'site-header' }

const TagsContainer = styled('div')`
  width: max-content;
  margin: 0 auto;
`

const TagLink = styled(StyledLink)`
  padding: 2px 4px;
  margin: 3px;
  border: 1px solid;
  border-radius: 3px;
  font-size: 0.75rem;

  &:hover {
    background-color: #4078c0;
    color: white;
  }
`

type HeaderProps = {
  siteTitle: string
  // siteDescription?: string;
}

export function Header({ siteTitle }: HeaderProps): React.ReactElement {
  const { allMdx } = useStaticQuery(
    graphql`
      query TAGS_QUERY {
        allMdx {
          group(field: frontmatter___tags) {
            tag: fieldValue
          }
        }
      }
    `,
  )
  const { group } = allMdx

  const tagsLinks = group.map((groupItem) => {
    const { tag } = groupItem
    return (
      <TagLink key={tag} to={`/tags/${kebabCase(tag)}`}>
        {tag}
      </TagLink>
    )
  })

  return (
    <header>
      <StyledLink to="/">
        <StyledH1>{siteTitle}</StyledH1>
      </StyledLink>
      <TagsContainer>{tagsLinks}</TagsContainer>
    </header>
  )
}

export default Header
// export function Header({ siteTitle, siteDescription }: HeaderProps): React.ReactElement<HeaderProps> {
//   return (
//     <Link to="/">
//       <StyledH1>{siteTitle}</StyledH1>
//       <p>{siteDescription}</p>
//     </Link>
//   );
// }

// export const Header: React.FC<HeaderProps> = ({ siteTitle, siteDescription }: HeaderProps) => {
//   return (
//     <Link to="/">
//       <StyledH1>{siteTitle}</StyledH1>
//       <p>{siteDescription}</p>
//     </Link>
//   );
// }
