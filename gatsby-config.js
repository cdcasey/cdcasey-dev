const siteMetadata = {
  title: `How I made this site and other thoughts.`,
  description: `I write down helpful tips so that I remember them. You benefit. Win-win.`,
  author: `@cdcasey, Chris Casey`,
};

const plugins = [
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.mdx`, `.md`],
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      path: `${__dirname}/content`,
      name: `content`,
    },
  },
  `gatsby-plugin-emotion`,
  `gatsby-plugin-typescript`,
];

module.exports = {
  siteMetadata,
  plugins,
};
