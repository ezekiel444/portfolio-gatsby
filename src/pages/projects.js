import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Projects from "../components/Projects"
import Seo from "../components/SEO"

const ProjectsPage = ({ data }) => {
  const {
    allContentfulProject: { nodes: projects },
  } = data

  return (
    <Layout>
      <section className="projects-page">
        <Projects projects={projects} title="all projects" />
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Projects" description="Projects Page" />

export const query = graphql`
  query Projects {
    allContentfulProject(sort: { contentful_id: ASC }) {
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
  }
`

export default ProjectsPage
