import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import TopMenu from "./topMenu"
import Menu from "./menu"
import parse from "html-react-parser"
import Img from "gatsby-image"

const Nav = () => {

    const {
        wp: {
        	generalSettings: { title },
			siteGeneralSettings: { 
				ACFGeneral: {
					capacitacion,
					logo
				}
			}
        },
		training
    } = useStaticQuery(query)

	const sources = [
		logo.mobileLogo.childImageSharp.fixed,
		{
		  ...logo.desktopLogo.childImageSharp.fixed,
		  media: `(min-width: 768px)`,
		},
	  ]

    return (
        <header>  
			<TopMenu />
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container">
					<Link to="/" className="navbar-brand"><Img fixed={sources} alt={parse(title)} /></Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primeryMenu" aria-controls="primeryMenu" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Menu capacitacion={capacitacion} training={training}/>
				</div>
			</nav>
        </header>
    )
}


export default Nav

const query = graphql`
query LogoAndGeneralQuery {
	wp {
		generalSettings {
			title
			description
		}
		siteGeneralSettings {
			ACFGeneral {
				capacitacion {
					label
					url
				}
				logo {
					desktopLogo: localFile {
						childImageSharp {
                            fixed(width: 200) {
                                ...GatsbyImageSharpFixed_noBase64
                            }
                        }
					}
					mobileLogo: localFile {
						childImageSharp {
                            fixed(width: 140) {
                                ...GatsbyImageSharpFixed_noBase64
                            }
                        }
					}
				}
			}
		}
	}
	training: file(name: {eq: "icon-training"}) {
		childImageSharp {
			fluid (maxWidth:50){
				...GatsbyImageSharpFluid_noBase64
			}
		}
	}
}`