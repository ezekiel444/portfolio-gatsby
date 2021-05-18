import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import SocialLinks from "../constants/socialLinks"
// import Test from "./Test"


const Hero = () => {

  const data = useStaticQuery(graphql`
  query MyHeroImage {
    file(relativePath: {eq: "hero-img.png"}) {
     info:childImageSharp {
      gatsbyImageData(
        layout:FULL_WIDTH
        placeholder: BLURRED
      
      )
      }
    }
  }
  
  `)
  const {file:{info}}= data
  const image = getImage(info)


  return <header className="hero">
    <div className="section-center hero-center">
<article className="hero-info">
<div>
  <div className="underline"></div>
  <h1>i'm Matomi</h1>
  <h4>blogger, mentor and mobile UI/UX Designer</h4>
  <Link to='/contact' className='btn'>Contact me</Link>
  <SocialLinks/>
  {/* <Test/> */}
</div>
</article>
<GatsbyImage image={image} className='hero-img' alt="hero image" />

    </div>
  </header>
}

export default Hero
