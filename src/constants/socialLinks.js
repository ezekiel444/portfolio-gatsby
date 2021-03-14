import React from "react"
import {
  FaLinkedin,
  FaTwitterSquare,
  FaInstagram,
  FaGithub
} from "react-icons/fa"

const data = [
  {
    id: 1,
    icon: <FaInstagram className="social-icon"></FaInstagram>,
    url: "https://instagram.com/ezekielmatomilucky",
  },
  {
    id: 2,
    icon: <FaLinkedin className="social-icon"></FaLinkedin>,
    url:  "https://www.linkedin.com/in/ezekiel-matomi-l-306796193",
  },
  {
    id: 3,
    icon: <FaGithub className="social-icon"></FaGithub>,
    url:  "https://github.com/ezekiel444",
  },
  {
    id: 5,
    icon: <FaTwitterSquare className="social-icon"></FaTwitterSquare>,
    url: "https://twitter.com/ezekielluckylu1",
  },
]
const links = data.map(link => {
  return (
    <li key={link.id}>
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
        {link.icon}
      </a>
    </li>
  )
})

export default ({ styleClass }) => {
  return (
    <ul className={`social-links ${styleClass && styleClass}`}>{links}</ul>
  )
}
