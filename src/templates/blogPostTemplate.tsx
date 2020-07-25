import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../components/Layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';

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

export default function Post({ data }: PostProps): React.ReactElement {
  const { frontmatter, body } = data.mdx;

  return (
    <Layout>
      <h1>{frontmatter.title}</h1>
      <p>{frontmatter.date}</p>
      <MDXRenderer>{body}</MDXRenderer>
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
