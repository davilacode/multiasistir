import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const TopMenu = () => {

    const {
        wp: {
            siteGeneralSettings: { 
                ACFTopMenu: { eMail, socialMedia, phones}
            },
        }
    } = useStaticQuery(query)

    return(
        <nav className="navbar navbar-expand-lg bg-gray-middle">
            <div className="container justify-content-end top-menu">
                <div>
                    <ul className="d-flex">
                        { 
                            socialMedia[0].socialNetwork.map(( social, key) => {
                                return (
                                    <li key={key}> 
                                        <a href={social.url} target={`_blank`} rel={`noreferrer noopener`} title={social.meta} > 
                                            <GatsbyImage image={social.icon.localFile.childImageSharp.gatsbyImageData} alt={social.meta} />
                                        </a>
                                    </li>
                                )
                            }) 
                        }
                    </ul>
                </div>
                <div className="d-flex align-items-center ">
                    <GatsbyImage image={phones[0].icon.localFile.childImageSharp.gatsbyImageData} alt={phones[0].meta} />
                    <ul>
                        {
                            phones[0].phonesNumber.map(( item, key) => {
                                return (
                                    <li key={key}> <a href={`tel:031${item.phone.replace(' ', '')}`} title={phones[0].meta} >{item.phone}</a></li>
                                )
                            }) 
                        }
                    </ul>
                </div>
                <div className="d-flex align-items-center ">
                    <GatsbyImage image={eMail[0].icon.localFile.childImageSharp.gatsbyImageData} alt={eMail[0].meta} />
                    <ul>
                        <li><a href={`mailto:${eMail[0].eMail}`} title={eMail[0].meta}>{eMail[0].eMail}</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default TopMenu

const query = graphql`
query TopMenuQuery {
    wp {
    siteGeneralSettings {
        ACFTopMenu {
        socialMedia {
            socialNetwork {
            meta
            url
            icon {
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            layout: FIXED,
                            width: 40,
                            placeholder: NONE
                        )
                    }
                }
            }
            }
        }
        eMail {
            eMail
            meta
            icon {
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        layout: FIXED,
                        width: 40,
                        placeholder: NONE
                    )
                }
            }
            }
        }
        phones {
            meta
            phonesNumber {
            phone
            }
            icon {
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        layout: FIXED,
                        width: 40,
                        placeholder: NONE
                    )
                }
            }
            }
        }
        }
    }
    }
}`