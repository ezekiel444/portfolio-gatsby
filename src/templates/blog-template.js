import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/Layout"
import ReactMarkdown from "react-markdown"
import Seo from "../components/SEO"

const ComponentName = ({data}) => {
  const {blog:{content,title, description}} = data

  return <Layout>
          <Seo title={title} description={description.raw}/>
    <section className="blog-template">
      <div className="section-center">
        <article className="blog-content">
            <h1>matomi</h1>
        <ReactMarkdown source={content.raw} />
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
