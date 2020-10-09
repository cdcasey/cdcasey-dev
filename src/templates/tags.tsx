import React from 'react';
import { Link, graphql } from 'gatsby';
// eslint-disable-next-line import/no-extraneous-dependencies
// import kebabCase from 'lodash/kebabCase';
import styled from '@emotion/styled';

import SEO from 'react-seo-component';

import { Layout } from '../components/Layout';
import { useSiteMetadata } from '../hooks/useSiteMetadata';

const IndexWrapper = styled.main``;
const PostWrapper = styled.div``;

type TagProps = {
  pageContext: {
    tag: string;
  };
  data: {
    allMdx: {
      nodes: [
        {
          id: string;
          excerpt: string;
          frontmatter: {
            title: string;
            date: string;
            cover: {
              childImageSharp: {
                sizes: FluidObject;
              };
            };
          };
          fields: {
            slug: string;
          };
        },
      ];
    };
  };
};

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
  } = useSiteMetadata();

  const { tag } = pageContext;
  const { edges, totalCount } = data.allMdx;
  const tagHeader = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${tag}"`;
  console.log(data);

  //TODO: I think just fix the graphql query and this part

  // const posts = data.allMdx.nodes.map(({ excerpt, frontmatter, fields, id }) => (
  //   <PostWrapper key={id}>
  //     <Link to={fields.slug}>
  //       {/* {frontmatter.cover ? <Image fluid={frontmatter.cover.childImageSharp.sizes} /> : null} */}
  //       <h2>{frontmatter.title}</h2>
  //     </Link>
  //     <p>{frontmatter.date}</p>
  //     <p>{excerpt}</p>
  //   </PostWrapper>
  // ));

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
      {/* <div>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { slug } = node.fields;
            const { title } = node.frontmatter;
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            );
          })}
        </ul>
        {/*
              This links to a page that does not yet exist.
              You'll come back to it!

      </div> */}
      {/* <IndexWrapper>{posts}</IndexWrapper> */}
    </Layout>
  );
};

export default Tags;

export const pageQuery = graphql`
  query($tag: String) {
    allMdx(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
