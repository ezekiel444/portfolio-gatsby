// import React from "react"
// import Layout from "../components/Layout"
// import { graphql } from "gatsby"
// import Blogs from "../components/Blogs"
// import Seo from "../components/SEO"

// const Blog = ({data:{allStrapiBlogs:{nodes:blogs}}}) => {
//   return <Layout>
//           <Seo title='Blogs' description='Blogs page'/>
//     <section className="blog-page">
//       <Blogs blogs={blogs} title='blogs' />
//     </section>
//   </Layout>
// }

// export default Blog



// export const query = graphql`
// query Blog {
//     allStrapiBlogs {
//       nodes {
//         id
//         category
//         description
//         title
//         slug
//         date(formatString: "MMMM Do YYYY")
//         image {
//           childImageSharp {
//             fluid {
//               ...GatsbyImageSharpFluid
//             }
//           }
//         }
//       }
//     }
//   }
// `