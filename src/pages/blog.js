import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Blogs from "../components/Blogs"
import Seo from "../components/SEO"

const Blog = ({
  data: {
    allContentfulBlog: { nodes: blogs },
  },
}) => {
  return (
    <Layout>
      <section className="blog-page">
        <Blogs blogs={blogs} title="blogs" />
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Blogs" description="Blogs page" />

export const query = graphql`
  query Blog {
    allContentfulBlog {
      nodes {
        id
        category
        content {
          raw
        }
        description {
          raw
        }
        slug
        title
        date(formatString: "MMMM Do YYYY")
        image {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  }
`

export default Blog
