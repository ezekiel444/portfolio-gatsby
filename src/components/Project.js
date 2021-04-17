// import React from "react"
// import PropTypes from "prop-types"
// import Image from "gatsby-image"
// import { FaGithubSquare, FaShareSquare } from "react-icons/fa"
// const Project = ({title,description,url,github,index,image,stack}) => {
//   return <article className="project">
//   {image && <Image fluid={image.childImageSharp.fluid} className='project-img' /> }
//     <div className="project-info">
//       <span className="project-number">0{index + 1}.</span>
//       <h3>{title}</h3>
//       <p className='project-desc'>{description}</p>
//       <div className="project-stack">{stack.map(item=><span key={item.id}>{item.title}</span>)}</div>
// <div className="project-links">
//   <a target="_blank" aria-label="github host" rel="noopener noreferrer" href={github}><FaGithubSquare className='project-icon'/></a>
//   <a target="_blank" aria-label="site url" rel="noopener noreferrer" href={url}><FaShareSquare className='project-icon'/></a>
// </div>
//     </div>
//   </article>
// }

// Project.propTypes = {
//   image:PropTypes.object, 
//   title:PropTypes.string.isRequired,
//   github:PropTypes.string.isRequired,
//   url:PropTypes.string.isRequired,
//   description:PropTypes.string.isRequired,
//   stack:PropTypes.arrayOf(PropTypes.object).isRequired
// }

// export default Project
