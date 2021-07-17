import React from 'react'
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"
import MenuItem from "./menuItem"

const Menu = ({capacitacion, training}) => {

    return (
        <div className="collapse navbar-collapse" id="primeryMenu">
			<StaticQuery 
                query={MenuQuery}
                render={(data) => {
                    if(data.wpMenu.menuItems) {
                        const menuItems = data.wpMenu.menuItems.nodes
                        const wordPressUrl = data.wp.generalSettings.url

                        return (
                            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
                                { 
                                    menuItems && menuItems.map((menuItem) => (
                                       <MenuItem key={menuItem.id} menuItem={menuItem} wordPressUrl={wordPressUrl} /> 
                                    )) 
                                }
                            </ul>
                        )
                    }
                    return null
                }}
            />
            { capacitacion && 
                capacitacion.map((link, i) => (
                    <div key={i}>
                        <a className="align-items-center d-flex training" href={link.url} target={`_blank`} rel={`noreferrer noopener`} title={parse(link.label)}>
                            <GatsbyImage
                                image={training.childImageSharp.gatsbyImageData}
                                className="me-2 "
                                alt={parse(link.label)} />
                            <span>{parse(link.label)}</span>
                        </a>
                    </div>
                ))
            }
        </div>
    )
}

export default Menu

const MenuQuery = graphql`
    query menuQuery {
        wpMenu(locations: {eq: PRIMARY}) {
            menuItems {
                nodes {
                    id
                    label
                    url
                    title
                    target
                }
            }
        }
        wp {
            generalSettings {
                url
            }
        }
    }
`