// import React from "react"
// import Layout from "../components/Layout"
// import { graphql } from "gatsby"
// import Title from "../components/Title"
// import Image from "gatsby-image"
// import SEO from "../components/SEO"
// const About = ({data:{about:{nodes}}}) => {
//  const {title, info, image, stack } = nodes[0]
//   return <Layout>
//           <SEO title='About' description='About page'/>
//     <section className="about-page">
//       <div className="section-center about-center">
//         <Image fluid={image.childImageSharp.fluid} className='about-img' />
       
// <article className="about-text">
//   <Title title={title} />
//   <p>{info}</p>
//   <div className="about-stack">
// {stack.map(item=>{
//   return <span key={item.id}>{item.title}</span>
// })}
//   </div>
// </article>

// <div className="contact-direct"><a className='btn'
//                 href="https://drive.google.com/file/d/1TlDNvdcE_OFzKHm1-Vr4djMf2eh8eJYA/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Cv Fr
//               </a>
//               <a className='btn'
//                 href="https://drive.google.com/file/d/1nl-kwG3bXs2R3UFRtspSN5jTQvN0uWM3/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Cv En
//               </a>
//               <a className='btn' href="tel:+33753432920" rel="noopener noreferrer">Direct Call</a></div>
        
//       </div>
//     </section>
//   </Layout>
// }

// export default About


// export const query = graphql`
// query About  {
//    about:allStrapiAbout {
//       nodes {
//         title
//         info
//         image {
//           childImageSharp {
//             fluid {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//         stack {
//           id
//           title
//         }
//       }
//     }
//   }
// `

import React from 'react'

export default function about() {
  return (
    <div>
      from my about page
    </div>
  )
}
