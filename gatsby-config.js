/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 * 
 * "about"
 */

 require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

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
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets/`,
      },
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "http://localhost:1337" || process.env.API_URL,
        queryLimit: 1000, // Default to 100
        contentTypes: ["jobs", "projects","blogs"],
        singleTypes: ["about"],
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


