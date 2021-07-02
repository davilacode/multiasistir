import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/Seo"
import TitleIntern from "../components/titleIntern"
import ContactForm from "../components/contactForm"

const Contact = ({ data: { contact } }) => {

  const { phones, email, address, description } = contact.ACFContact

  const featuredImage = {
    fluid: contact.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  }

  return (
    <Layout>
      <Seo title={contact.title} />
      <TitleIntern title={contact.title} image={featuredImage?.fluid} />
      <div className="wrap_content container">
        <div className="row py-5">
          <div className="col-md-5 pb-4 mb-4 data-contact">
            <div className="list-phones d-flex flex-column">
              {phones.map(({phone}, i) => (
                <a href={`tel:+57${phone.replace(/ /g, '')}`} key={i} title="Teléfono">{phone}</a>
              ))}
            </div>
            <div className="list-email d-flex flex-column">
                <a href={`mailto:${email}`} title="Correo electrónico">{email}</a>
            </div>
            <div className="list-address d-flex flex-column">
                <span>{address}</span>
            </div>
          </div>
          <div className="col-md-7 form-contact">
            <h2>{parse(description)}</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`query ContactById($id: String) {
  contact: wpPage(id: {eq: $id}) {
    id
    content
    title
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
    ACFContact {
      address
      description
      email
      phones {
        phone
      }
    }
  }
}
`
