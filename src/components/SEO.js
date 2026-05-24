import React from "react"
import { useStaticQuery, graphql } from "gatsby"

// This component is used as a named export `<Head>` in each page.
// Usage: export const Head = () => <Seo title="Page Title" />
const SEO = ({ title, description, children }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle: title
          author
          siteDesc: description
          siteUrl
          image
          twitterUsername
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { siteTitle, siteDesc, siteUrl, image, twitterUsername },
    },
  } = data

  const metaTitle = title ? `${title} - ${siteTitle}` : siteTitle
  const metaDesc = description || siteDesc

  return (
    <>
      <html lang="fr" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDesc} />
      <meta name="image" content={image} />
      {/* Twitter card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      {children}
    </>
  )
}

export default SEO
