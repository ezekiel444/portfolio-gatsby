import React from "react"
import { FaAlignRight } from "react-icons/fa"
import PageLinks from "../constants/links"
const Navbar = ({toggleNav}) => {

  return <nav className='navbar'>
    <div className="nav-center">
      <div className="nav-header">
           <h3>𝐌𝐚𝐭<span style={{color:"green"}}>𝐎𝐦𝐢</span> 🕊</h3>
          <button onClick={toggleNav} type='button' className="toggle-btn">
    <FaAlignRight></FaAlignRight>
          </button>
      </div>
        <PageLinks styleClass="nav-links"></PageLinks>
    </div>
  </nav>
}


export default Navbar
