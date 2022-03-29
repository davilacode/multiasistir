import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import imgWhatsapp from "../../content/assets/icon-wp.png"
import imgPse from "../../content/assets/icon-pse.png"

const Whatsapp = () => {

    const data = useStaticQuery(query)

    const whatsappNumber = data.wp.siteGeneralSettings.ACFWhatsapp.whatsapp
    const pseLink = data.wp.siteGeneralSettings.ACFPse.link

    return (
        <>
            <a id="whatsapp" href={`https://api.whatsapp.com/send/?phone=57${whatsappNumber}`} title="WhatsApp" target="_blank" rel="noreferrer noopener">
                <img src={imgWhatsapp} alt="WhatsApp"/>
            </a>
            <a id="pse" href={`${pseLink}`} title="PSE" target="_blank" rel="noreferrer noopener">
                <img src={imgPse} alt="PSE"/>
            </a>
        </>
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
                ACFPse {
                    link
                }
            }
        }
    }
`