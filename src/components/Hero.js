import React from "react"
import Img from "gatsby-image"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import SocialLinks from "../constants/socialLinks"


const Hero = () => {

  const data = useStaticQuery(graphql`
  query MyHeroImage {
    file(relativePath: {eq: "hero-img.png"}) {
     info:childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  
  `)
  const {file:{info:{fluid}}}= data
  return <header className="hero">
    <div className="section-center hero-center">
<article className="hero-info">
<div>
  <div className="underline"></div>
  <h1>i'm Matomi</h1>
  <h4>blogger, freelancer, mentor and mobile UI/UX Designer</h4>
  <Link to='/contact' className='btn'>Contact me</Link>
  <SocialLinks/>
</div>
</article>
<Img fluid={fluid} className='hero-img'/>
    </div>
  </header>
}

export default Hero
