import React from 'react';
import { graphql, Link } from 'gatsby';
import GatsbyImage, { FluidObject } from 'gatsby-image';
import styled from '@emotion/styled';

import { Layout } from '../components/Layout';

const IndexWrapper = styled.main``;

const PostWrapper = styled.div``;

const Image = styled(GatsbyImage)`
  border-radius: 5px;
`;

type HomeProps = {
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

const Home = ({ data }: HomeProps): React.ReactElement => {
  const posts = data.allMdx.nodes.map(({ excerpt, frontmatter, fields, id }) => (
    <PostWrapper key={id}>
      <Link to={fields.slug}>
        {frontmatter.cover ? <Image fluid={frontmatter.cover.childImageSharp.sizes} /> : null}
        <h2>{frontmatter.title}</h2>
      </Link>
      <p>{frontmatter.date}</p>
      <p>{excerpt}</p>
    </PostWrapper>
  ));

  return (
    <Layout>
      <IndexWrapper>{posts}</IndexWrapper>
    </Layout>
  );
};

export default Home;

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
          date(formatString: "YYYY MMMM Do")
          cover {
            publicURL
            childImageSharp {
              sizes(maxWidth: 2000, traceSVG: { color: "#639" }) {
                ...GatsbyImageSharpSizes_tracedSVG
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
`;
