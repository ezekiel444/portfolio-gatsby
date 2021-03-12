import React from "react"
import PropTypes from "prop-types"
import Image from "gatsby-image"
import { Link } from "gatsby"
const Blog = ({title, slug,id, image, date, category,description}) => {
  return <Link to={`/blog/${slug}`} key={id} className='blog' >
  <article>
    <Image fluid={image.childImageSharp.fluid} className='blog-img'  />
<div className="blog-card">
  <h4>{title}</h4>
  <h4>{description}</h4>
  <div className="blog-footer">
    <p>{category}</p>
    <p>{date}</p>
  </div>
</div>
  </article>
  </Link>
}

Blog.propTypes = {
  image:PropTypes.object.isRequired,
  title:PropTypes.string.isRequired,
  date:PropTypes.string.isRequired,
  category:PropTypes.string.isRequired,
  description:PropTypes.string.isRequired
}

export default Blog
