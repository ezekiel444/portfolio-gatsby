import { Link } from "gatsby"
import React, { useLayoutEffect, useState } from "react"
import { FaAlignRight } from "react-icons/fa"
import PageLinks from "../constants/links"

const Navbar = ({toggleNav}) => {
  const [scrollY, setScrollY] = useState(0)


  const handleScroll = ()=>{
    const pageY = window.pageYOffset
setScrollY(pageY)
  }

  useLayoutEffect(()=>{
    window.addEventListener('scroll', handleScroll)

    const navBar = document.querySelector('.navbar')
    if(scrollY > 300){
    navBar.style.background = '#2caeba'
    navBar.style.transition = 'all 1s ease-in-out'
  
    }else{
      navBar.style.background = '#fff'
    navBar.style.transition = 'all 1s ease-in-out'
    }



    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[scrollY])

return <nav className='navbar' >
    <div className="nav-center">
      <div className="nav-header">
           <Link to='/'><h3>𝐌𝐚𝐭<span style={{color:"green"}}>𝐎𝐦𝐢</span> 🕊</h3></Link>
          
    <FaAlignRight onClick={toggleNav} type='button' className="toggle-btn" />
      </div>
        <PageLinks styleClass="nav-links"></PageLinks>
    </div>
  </nav>
}


export default Navbar
