/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 * "about"
 */

 require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`, // or '.env'
});

// And then you can use the config in gatsby-config.js
// const config = require('gatsby-plugin-config');

const config = require('gatsby-plugin-config').default;


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
    `gatsby-plugin-react-helmet`,
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
        spaceId: config.SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: config.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favico.ico`,
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


