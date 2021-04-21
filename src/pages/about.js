import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Title from "../components/Title"
import Seo from "../components/SEO"
import { GatsbyImage } from "gatsby-plugin-image"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';



const About = ({data:{allContentfulAbout:{nodes}}}) => {
  
   
 const {title, info, image, stack } = nodes[0]

  return <Layout>
          <Seo title='About' description='About page'/>
    <section className="about-page">
      <div className="section-center about-center">
        <GatsbyImage image={image.gatsbyImageData} className='about-img' alt='my profile picture'/>
       
<article className="about-text">
  <Title title={title} />
  <p>{
  documentToReactComponents(
    JSON.parse(info.raw)
  )
}</p> 

  <div className="about-stack">
{stack.stack.map((item,id)=>{
  return <span key={id}>{item}</span>
})}
  </div>
</article>
 </div>
    </section>
  </Layout>
}

export default About


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