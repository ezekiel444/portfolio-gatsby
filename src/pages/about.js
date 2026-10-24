import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Seo from "../components/SEO"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import GatsbyKineticMotion from "../components/GatsbyKineticMotion"

const About = ({
  data: {
    allContentfulAbout: { nodes },
  },
}) => {
  const { title, info, image, stack } = nodes[0]

  return (
    <Layout>
      <section className="about-page">
        <div className="section-center about-center">
          <GatsbyKineticMotion status="Full Stack & Mentor" location="Lyon, FR">
            <GatsbyImage
              image={image.gatsbyImageData}
              className="about-img"
              alt="my profile picture"
            />
          </GatsbyKineticMotion>
          <article className="about-text">
            <Title title={title} />
            <div>{documentToReactComponents(JSON.parse(info.raw))}</div>
            <div className="about-stack">
              {stack.stack.map((item, id) => (
                <span key={id}>{item}</span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="About" description="About page" />

export const query = graphql`
  query MyQuery {
    allContentfulAbout {
      nodes {
        title
        info {
          raw
        }
        image {
          gatsbyImageData(layout: FULL_WIDTH)
        }
        stack {
          stack
        }
      }
    }
  }
`

export default About
