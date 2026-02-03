---
title: Adding Posts
pubDate: 2020-07-24
published: true
tags: ['site info']
description: Making the markdown go live
---

So it's finally time to have posts show up on my blog's home page. Still following [this tutorial](https://www.freecodecamp.org/news/build-a-developer-blog-from-scratch-with-gatsby-and-mdx/), I add the graphql query. When it comes to create a type for my home page props, I create this:

```typescript
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
```

It seems unweildy, and I strongly suspect that there's a more sensible way to do this. But it works for now so I decide to keep it. I also notice that as I'm developing it, my code keeps compiling and running even when there's a type mismatch. It's then that I remeber that _[the gatsby plugin doesn't do type checking](https://www.gatsbyjs.org/packages/gatsby-plugin-typescript/#caveats)_. Relying on VS Code's errors, I push on. It's time to get into the node file.

My big takeaway from working on the `gatsby-node.js` file is that the `context` part of the `createPage` API call not only goes into the page template's `graphql` query, but it also goes into the component's `pageContext` prop.
