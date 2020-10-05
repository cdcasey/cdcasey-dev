const siteMetadata = {
  title: `cdcasey.dev`,
  titleTemplate: `my struggles with code`,
  description: `I write down helpful tips so that I remember them. You benefit. Win-win.`,
  image: `fred`,
  siteUrl: `https://cdcasey.dev`,
  siteLanguage: `en-US`,
  siteLocale: `en_us`,
  twitterUsername: `@cdcasey`,
  author: `@cdcasey, Chris Casey`,
  authorName: `Chris Casey`,
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
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
];

module.exports = {
  siteMetadata,
  plugins,
};
