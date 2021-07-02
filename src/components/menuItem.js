import React from 'react'
import { CreateLocalLink } from "../utils"
import { StaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";

const MenuItem = ({ menuItem, wordPressUrl }) => {

    return (
        <li className="menu-item">
            <Link
                className="d-flex align-items-center flex-lg-column"
                to={CreateLocalLink(menuItem, wordPressUrl)}
                activeClassName="active"
            >
                <StaticQuery 
                    query={iconQuery}
                    render={(data) => {
                            return <>
                                {data[menuItem.label.toLowerCase()]?.childImageSharp?.gatsbyImageData &&
                                    <GatsbyImage
                                        image={data[menuItem.label.toLowerCase()].childImageSharp.gatsbyImageData}
                                        alt={menuItem.label} />
                                }
                            </>
                        }
                    }
                />
                {menuItem.label}
            </Link>
        </li>
    );
}

export default MenuItem

const iconQuery = graphql`{
  inicio: file(name: {eq: "icon-inicio"}) {
    childImageSharp {
      gatsbyImageData(width: 40, placeholder: NONE, layout: CONSTRAINED)
    }
  }
  servicios: file(name: {eq: "icon-servicios"}) {
    childImageSharp {
      gatsbyImageData(width: 40, placeholder: NONE, layout: CONSTRAINED)
    }
  }
  noticias: file(name: {eq: "icon-noticias"}) {
    childImageSharp {
      gatsbyImageData(width: 40, placeholder: NONE, layout: CONSTRAINED)
    }
  }
  contacto: file(name: {eq: "icon-contacto"}) {
    childImageSharp {
      gatsbyImageData(width: 40, placeholder: NONE, layout: CONSTRAINED)
    }
  }
  nosotros: file(name: {eq: "icon-nosotros"}) {
    childImageSharp {
      gatsbyImageData(width: 40, placeholder: NONE, layout: CONSTRAINED)
    }
  }
}
`