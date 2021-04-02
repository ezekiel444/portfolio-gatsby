import React from "react"
import Links from "../constants/links"
import SocialLinks from "../constants/socialLinks"
import { FaTimes } from "react-icons/fa"
const Sidebar = ({toggleNav,setNav}) => {

  return <aside className={`sidebar ${toggleNav && 'show-sidebar'}`}>
  <button type="button" aria-label="close button" className="close-btn" onClick={setNav} ><FaTimes/></button>
  <div className="side-container">
    <Links styleClass={`${toggleNav && 'sidebar-links'}`} />
    <SocialLinks styleClass={`${toggleNav && 'sidebar-icons'}`} />
  </div>
  </aside>
}

export default Sidebar
