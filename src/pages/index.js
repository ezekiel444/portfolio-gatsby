import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import Projects from "../components/Projects"
import Blogs from "../components/Blogs"
import Seo from "../components/SEO"

const IndexPage = ({ data }) => {
  const {
    allContentfulProject: { nodes: projects },
    allContentfulBlog: { nodes: blogs },
  } = data

  return (
    <Layout>
      <Hero />
      <Services />
      <Jobs />
      <Projects title="featured projects" projects={projects} showLink />
      <Blogs blogs={blogs} title="latest articles" showLink />
    </Layout>
  )
}

export const Head = () => <Seo title="Home" description="This is my home page" />

export const query = graphql`
  {
    allContentfulProject(
      sort: { contentful_id: ASC }
      filter: { featured: { eq: true } }
    ) {
      nodes {
        id
        github
        title
        url
        description
        stack {
          stack
        }
        image {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
    allContentfulBlog(sort: { date: DESC }) {
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

export default IndexPage
