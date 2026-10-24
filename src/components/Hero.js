import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import SocialLinks from "../constants/socialLinks"
import GatsbyKineticMotion from "./GatsbyKineticMotion"

const Hero = () => {
  const data = useStaticQuery(graphql`
    query MyHeroImage {
      file(relativePath: { eq: "hero-img.png" }) {
        info: childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        }
      }
    }
  `)

  const image = data?.file?.info ? getImage(data.file.info) : null

  return (
    <header className="hero">
      <div className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline"></div>
            <h1>i&apos;m Matomi</h1>
            <h4>blogger, mentor and mobile UI/UX Designer</h4>
            <Link to="/contact" className="btn">
              Contact me
            </Link>
            <SocialLinks />
          </div>
        </article>
        <div className="hero-img">
          <GatsbyKineticMotion>
            {image ? (
              <GatsbyImage
                image={image}
                alt="Matomi Lucky Ezekiel"
                className="hero-img-element"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            ) : (
              <img
                src="/hero-img.png"
                alt="Matomi Lucky Ezekiel"
                className="hero-img-element"
                style={{ width: "100%", height: "auto", display: "block" }}
              />
            )}
          </GatsbyKineticMotion>
        </div>
      </div>
    </header>
  )
}

export default Hero
