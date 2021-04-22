import React from "react"
import {
  FaLinkedin,
  FaTwitterSquare,
  FaInstagram,
  FaGithub,
FaRegAddressCard,
FaAddressCard
} from "react-icons/fa"

import { MdContactPhone } from "react-icons/md";



const data = [
  {
    id: 1,
    icon: <FaInstagram className="social-icon"></FaInstagram>,
    url: "https://instagram.com/ezekielmatomilucky",
    title:'Instagram'
  },
  {
    id: 2,
    icon: <FaLinkedin className="social-icon"></FaLinkedin>,
    url:  "https://www.linkedin.com/in/ezekiel-matomi-l-306796193",
    title:'Linkedin'
  },
  {
    id: 3,
    icon: <FaGithub className="social-icon"></FaGithub>,
    url:  "https://github.com/ezekiel444",
    title:'Github'
  },
  {
    id: 4,
    icon: <FaTwitterSquare className="social-icon"></FaTwitterSquare>,
    url: "https://twitter.com/ezekielluckylu1",
    title:'Twitter'
  },
{
 personalCV:[{
  id: 5,
  icon_info: <MdContactPhone className="social-icon"></MdContactPhone>,
  url_info: "tel:+33753432920",
  title_info:'Call'
},
{
  id: 6,
  icon_info: <FaRegAddressCard className="social-icon"></FaRegAddressCard>,
  url_info: "https://drive.google.com/file/d/1nl-kwG3bXs2R3UFRtspSN5jTQvN0uWM3/view?usp=sharing",
  title_info:'Fr_Cv'
},
{
  id: 7,
  icon_info: <FaAddressCard className="social-icon"></FaAddressCard>,
  url_info: "https://drive.google.com/file/d/1TlDNvdcE_OFzKHm1-Vr4djMf2eh8eJYA/view?usp=sharing",
  title_info:'En_Cv'
}]
}
]

const links = data.map(link => {
  return (
    <>
    <li key={link.id}>
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="social-link" title={link.title}>
        {link.icon}
      </a>
    </li>
      </>
  )
})

const links_info = data[4].personalCV.map(link=>{
  return (
   <li key={link.id}>
  <a className='personalCv' target="_blank" rel="noopener noreferrer" href={link.url_info} >{link.title_info}</a>
  </li>
  )
})



 const socialIcons =({ styleClass }) => {
  return (
    <>
    <ul className={`social-links ${styleClass && styleClass}`}>{links}</ul>
    <ul className={`social-links ${styleClass && styleClass}`}>{links_info}</ul>
    </>
  )
}

export default socialIcons

