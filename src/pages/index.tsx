import React from 'react';
import { graphql } from 'gatsby';

import { Layout } from '../components/Layout';

type HomeProps = {
  data: {
    allMdx: {
      nodes: [
        {
          excerpt: string;
          frontmatter: {
            title: string;
            date: string;
          };
        },
      ];
    };
  };
};

const Home = ({ data }: HomeProps): React.ReactElement => {
  const posts = data.allMdx.nodes.map(({ excerpt, frontmatter }) => {
    return (
      <React.Fragment key={frontmatter.title}>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
        <p>{excerpt}</p>
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
      <Layout>{posts}</Layout>
    </React.Fragment>
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
          date
        }
      }
    }
  }
`;
