import React,{useState} from "react"
// import "../css/main.css"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
const Layout = ({ children }) => {
  const [toggleNav,setToggleNav] = useState(false)
  const ToggleNavBar = ()=>setToggleNav(!toggleNav)
  return (
    <>
      <Navbar toggleNav={ToggleNavBar} />
      <Sidebar toggleNav={toggleNav} setNav={ToggleNavBar}/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
