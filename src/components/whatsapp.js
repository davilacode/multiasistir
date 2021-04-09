import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import imgWhatsapp from "../../content/assets/icon-wp.png"

const Whatsapp = () => {

    const data = useStaticQuery(query)

    const whatsappNumber = data.wp.siteGeneralSettings.ACFWhatsapp.whatsapp

    return (
        <a id="whatsapp" href={`https://api.whatsapp.com/send/?phone=57${whatsappNumber}`} title="WhatsApp" target="_blank" rel="noreferrer noopener">
            <img src={imgWhatsapp} alt="WhatsApp"/>
        </a>
    )
}

export default Whatsapp

const query = graphql`
    query waQuery {
        wp {
            siteGeneralSettings {
                ACFWhatsapp {
                    whatsapp
                }
            }
        }
    }
`