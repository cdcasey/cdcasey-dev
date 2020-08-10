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
      gatsbyRemarkPlugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
      ],
      plugins: [
        {
          resolve: `gatsby-remark-images`,
          options: {
            maxWidth: 590,
          },
        },
      ],
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
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
];

module.exports = {
  siteMetadata,
  plugins,
};
