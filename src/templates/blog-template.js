import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';


const ComponentName = ({data}) => {
  const {blog:{content,title, description}} = data

  return <Layout>
          <Seo title={title} description={description.raw}/>
    <section className="blog-template">
      <div className="section-center">
        <article className="blog-content">
            <h2>{title}</h2>
      <p>
          {documentToReactComponents(JSON.parse(content.raw))}
      </p>
        </article>
        <Link to='/blog' className='btn center-btn' >
          blog
        </Link>
      </div>
    </section>
  </Layout>
}

export const query = graphql`
  query GetSingleBlog($slug: String) {
    blog: contentfulBlog(slug: { eq: $slug }) {
        content {
            raw
          }
          title
          description {
            raw
          }
    }
  }
`

export default ComponentName
