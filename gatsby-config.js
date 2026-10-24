/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});
require('dotenv').config({
  path: `.env`,
});

const spaceId = process.env.CONTENTFUL_SPACE_ID || process.env.SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || process.env.ACCESS_TOKEN;

module.exports = {
  siteMetadata: {
    title: "Matomi Portfolio",
    description: "Welcome to Ezekiel Matomi Lucky Portfolio Site",
    author: "@Matomi Lucky",
    twitterUsername: "@ezekielluckylu1",
    image: "/twitter-img.png",
    siteUrl: "https://matomi.netlify.app",
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: spaceId,
        accessToken: accessToken,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `static/favico.ico`,
      },
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Roboto",
              variants: ["400", "700"],
            },
            { family: "Open Sans" },
          ],
        },
      },
    },
  ],
}
