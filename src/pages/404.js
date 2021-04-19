import React from "react"
import Layout from "../components/Layout"
import { Link } from "gatsby"
import Seo from "../components/SEO"

const Error = () => {
  return <Layout> <main className="error-page">
          <Seo title='Error 404' description='Error 404 page'/>
    <div className="error-container">
      <h1>o0oOps.... Page not found</h1>
      <Link to='/' className='btn'>back home</Link>
    </div>
  </main>
  </Layout>
}

export default Error
