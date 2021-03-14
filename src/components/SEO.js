import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({title, description}) => {

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
const {site:{siteMetadata:{siteTitle,siteDesc,siteUrl,image,twitterUsername}}} = data

  return <Helmet title={title ? `${title} - ${siteTitle}` : siteTitle} htmlAttributes={{lang:'fr'}}>
    <meta content={description || siteDesc} name='description' />
    <meta content={image} name='image' />
    {/* twitter card */}
    <meta name='twitter:card' content='summary_large_image'  />
    <meta name='twitter:creator' content={twitterUsername}  />
    <meta name='twitter:title' content={siteTitle}  />
    <meta name='twitter:description' content={siteDesc}  />
    <meta name='twitter:image' content={`${siteUrl}${image}`}  />
   
  </Helmet>
}

export default SEO

