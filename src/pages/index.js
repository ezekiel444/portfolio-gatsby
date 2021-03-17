import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import Projects from "../components/Projects"
import Blogs from "../components/Blogs"
import SEO from '../components/SEO'
export default ({data}) => {
  const {allStrapiProjects:{nodes:projects},
  allStrapiBlogs:{nodes:blogs}
} = data

  return <Layout>
          <SEO title='Home' description='This is my home page'/>
          <Hero/>
          <Services/>
          <Jobs/>
          <Projects title='featured projects' projects={projects} showLink />
          <Blogs blogs={blogs} title='latest articles' showLink  />
  </Layout>
}

export const query = graphql`
{
    allStrapiProjects(filter: {featured: {eq: true}}) {
      nodes {
        id
        title
        description
        github
        url
        stack {
          id
          title
        }
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    },
    allStrapiBlogs(sort: {fields: date, order: DESC}) {
      nodes {
        id
        category
        content
        description
        title
        slug
        date(formatString: "MMMM Do YYYY")
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
