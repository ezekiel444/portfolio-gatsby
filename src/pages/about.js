import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Image from "gatsby-image"
import Seo from "../components/SEO"
const About = ({data:{about:{nodes}}}) => {
 const {title, info, image, stack } = nodes[0]
  return <Layout>
          <Seo title='About' description='About page'/>
    <section className="about-page">
      <div className="section-center about-center">
        <Image fluid={image.childImageSharp.fluid} className='about-img' />
       
<article className="about-text">
  <Title title={title} />
  <p>{info}</p>
  <div className="about-stack">
{stack.map(item=>{
  return <span key={item.id}>{item.title}</span>
})}
  </div>
</article>
 </div>
    </section>
  </Layout>
}

export default About


export const query = graphql`
query About  {
   about:allStrapiAbout {
      nodes {
        title
        info
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
        stack {
          id
          title
        }
      }
    }
  }
`