import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import { Layout } from '../components/Layout';
import Dump from '../components/Dump';

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
};

export default function Post({ data, pageContext }: PostProps): React.ReactElement {
  const { frontmatter, body } = data.mdx;
  const { previous, next } = pageContext;

  return (
    <Layout>
      <Dump pageContext={pageContext} />
      <Dump previous={previous} />
      <Dump next={next} />
      <h1>{frontmatter.title}</h1>
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
