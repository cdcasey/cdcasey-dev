---
title: Adding Images
date: 2020-08-10
published: true
tags: site info
cover: ./liberty.jpg
---

I'm not posting about the `react-live` section because I don't think I'll ever actually use it. However, it looks like a very cool library, so I encourage you to read about it.

If there's one thing I hate about Gatsby, it's the image API. Don't get me wrong: I do love the way Gatsby automatically handles images and makes them responsive by default. But it seems like the API could be much simpler. I had to add four packages, a graphql query, and code in the component to get it all to work. Regardless, I can now add cover images to my blog posts, so that's cool.

So I added lines 13-20 for the cover in the frontmatter to the graphql query:

```graphql
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
```

What I quickly learned is that one of the markdown files had to have a cover image for this query to work. Otherwise it chokes on the `cover` key. I also noticed that I can't highlight individual lines. The ability to do so may require the addition of another Gatsby plugin. I'm pleased with the progress overall, however.

_Update_: I've since figured out how to configure things so that I can highlight lines in the code snippets. However, I've since discovered the [gatsby-remark-vscode](https://www.gatsbyjs.org/packages/gatsby-remark-vscode/) library which can not only highlight lines but also display diffs. Once everything is set up, I'll be pulling out old code and setting things up to use it instead of prism-react-renderer.

_Update_ 2: gatsby-remark-vscode did not work the way I wanted it to, so so it's back to rolling my own solution for now
