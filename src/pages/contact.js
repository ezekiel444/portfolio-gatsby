import React from "react"
import Layout from "../components/Layout"
import Seo from "../components/SEO"
import { ContactSendMessage } from "../components/ContactSendMessage"



const contact = () => {

  return <Layout>
          <Seo title='Contact' description='Contact page'/>
<section className="contact-page">
  <article className="contact-form">
    <h3>My DM is always open</h3>
   <ContactSendMessage/>
  </article>
</section>

  </Layout>
}

export default contact
