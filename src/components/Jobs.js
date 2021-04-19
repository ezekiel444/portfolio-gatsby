import React,{useState} from "react"
import Title from "./Title"
import { FaAngleDoubleRight } from "react-icons/fa"
import { graphql, useStaticQuery } from "gatsby"
import { Link } from "gatsby"



const Jobs = () => {

    const data = useStaticQuery(graphql`
    {
      allContentfulJob(sort: {fields: contentful_id, order: DESC}) {
        nodes {
          company
          date
          position
          name {
            stack
          }
          contentful_id
        }
      }
    }
    `)
const {allContentfulJob:{nodes:userJobs}} = data

const [userValue, setUserValue] = useState(0)


const {company, position, date,name:{stack}} = userJobs[userValue]

 return <section className="section jobs">
   <Title  title='experience' />
   <div className="jobs-center">
     <div className="btn-container">
       {userJobs.map((item, index)=>{
         return <button onClick={()=>setUserValue(index)} key={item.contentful_id} className={`job-btn ${index===userValue && "active-btn"}`} >
           {item.company}
         </button>
       })}
     </div>
     <article className="job-info">
       <h3>{position}</h3>
       <h4>{company}</h4>
       <p className="job-date">{date}</p>
       {stack.map((name,id)=>{
         return <div key={id} className="job-desc">
            <FaAngleDoubleRight className='job-icon'/>
            <p>{name}</p>
         </div>
       })}
     </article>
   </div>
<Link to='/about' className='btn center-btn'>more info</Link>
 </section> 


}

export default Jobs
