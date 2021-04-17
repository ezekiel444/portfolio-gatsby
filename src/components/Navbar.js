import { Link } from "gatsby"
import React, { useEffect, useState, useRef } from "react"
import { FaAlignRight } from "react-icons/fa"
import PageLinks from "../constants/links"

const Navbar = ({toggleNav}) => {
  const [scrollY, setScrollY] = useState(0)

const  navBar = useRef(null)

  const handleScroll = ()=>{
    const pageY = window.pageYOffset
setScrollY(pageY)
  }

  useEffect(()=>{

    const navBav1 = navBar.current

    window.addEventListener('scroll', handleScroll)

    if(scrollY > 300){
    navBav1.style.background = 'hsl(185, 94%, 87%)'
    navBav1.style.transition = 'all 1s ease-in-out'
  
    }else{
      navBav1.style.background = '#fff'
    navBav1.style.transition = 'all 1s ease-in-out'
    }



    return ()=>{
      window.removeEventListener('scroll', handleScroll)
    }
  },[scrollY])

return <nav className='navbar' ref={navBar}>
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
