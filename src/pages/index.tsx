import React from 'react';
import { graphql, Link } from 'gatsby';

import { Layout } from '../components/Layout';

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
    <React.Fragment key={id}>
      <Link to={fields.slug}>
        <h1>{frontmatter.title}</h1>
      </Link>
      <p>{frontmatter.date}</p>
      <p>{excerpt}</p>
    </React.Fragment>
  ));

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
        fields {
          slug
        }
      }
    }
  }
`;
