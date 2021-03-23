import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
// import { Test } from "../components/Test"



const contact = () => {

  return <Layout>
          <SEO title='Contact' description='Contact page'/>
<section className="contact-page">
  <article className="contact-form">
    <h3>Pm me at any time</h3>
    <form action="https://formspree.io/f/xjvpnegv" method="POST"> 
      <div className="form-group">
        <input type="text" placeholder='name' name='name' className='form-control' />
        <input type="email" placeholder='email' name='email' className='form-control'  />
        <textarea name="message" placeholder='message' rows="6" className='form-control'></textarea>
      </div>
      <button type='submit' className='submit-btn btn'>sumbit email</button>
    </form>
    {/* <Test/> */}
  </article>
</section>

  </Layout>
}

export default contact
