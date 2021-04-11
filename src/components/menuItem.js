import React from 'react'
import { CreateLocalLink } from "../utils"
import { StaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

const MenuItem = ({ menuItem, wordPressUrl }) => {

    return (
        <li className="menu-item">
            <Link
                className="d-flex align-items-center flex-column"
                to={CreateLocalLink(menuItem, wordPressUrl)}
                activeClassName="active"
            >
                <StaticQuery 
                    query={iconQuery}
                    render={(data) => {
                            return (
                                <>
                                    {data[menuItem.label.toLowerCase()]?.childImageSharp?.fluid &&
                                        <Img fluid={data[menuItem.label.toLowerCase()].childImageSharp.fluid} alt={menuItem.label} />
                                    }
                                </>
                            )
                        }
                    }
                />
                {menuItem.label}
            </Link>
        </li> 
    )
}

export default MenuItem

const iconQuery = graphql`
    query {
        inicio: file(name: {eq: "icon-inicio"}) {
            childImageSharp {
                fluid (maxWidth:40){
                    ...GatsbyImageSharpFluid_noBase64
                }
            }
        }
        servicios: file(name: {eq: "icon-servicios"}) {
            childImageSharp {
                fluid (maxWidth:40){
                    ...GatsbyImageSharpFluid_noBase64
                }
            }
        }
        noticias: file(name: {eq: "icon-noticias"}) {
            childImageSharp {
                fluid (maxWidth:40){
                    ...GatsbyImageSharpFluid_noBase64
                }
            }
        }
        contacto: file(name: {eq: "icon-contacto"}) {
            childImageSharp {
                fluid (maxWidth:40){
                    ...GatsbyImageSharpFluid_noBase64
                }
            }
        }
        nosotros: file(name: {eq: "icon-nosotros"}) {
            childImageSharp {
                fluid (maxWidth:40){
                    ...GatsbyImageSharpFluid_noBase64
                }
            }
        }
    }
`