import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Projects from "../components/Projects"
import SEO from "../components/SEO"


const ProjectsPage = ({data}) => {
  const {allStrapiProjects:{nodes:projects}} = data
  return <Layout>
          <SEO title='Projects' description='Projects Page'/>
    <section className="projects-page">
      <Projects projects={projects} title='all projects' />
    </section>
  </Layout>
}

export default ProjectsPage 


export const query = graphql`
query Projects {
    allStrapiProjects {
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
    }
  }
`