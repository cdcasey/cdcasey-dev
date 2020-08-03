import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout } from '../components/Layout';

type PostProps = {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        date: string;
      };
      body: string;
    };
  };
  pageContext: {
    previous: {
      fields: { slug: string };
      frontmatter: { title: string };
    };
    next: {
      fields: { slug: string };
      frontmatter: { title: string };
    };
  };
};

export default function Post({ data, pageContext }: PostProps): React.ReactElement {
  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <h2>{frontmatter.title}</h2>
      <p>{frontmatter.date}</p>
      <MDXRenderer>{body}</MDXRenderer>
      {previous && (
        <Link to={previous.fields.slug}>
          <p>{previous.frontmatter.title}</p>
        </Link>
      )}
      {next && (
        <Link to={next.fields.slug}>
          <p>{next.frontmatter.title}</p>
        </Link>
      )}
    </Layout>
  );
}

export const query = graphql`
  query PostsBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "YYYY MMMM Do")
      }
    }
  }
`;
