import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import TopMenu from "./topMenu"
import Menu from "./menu"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image"

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

    return (
        <header>  
			<TopMenu />
			<nav className="navbar navbar-expand-lg navbar-light">
				<div className="container">
					<Link to="/" className="navbar-brand"><GatsbyImage image={logo.desktopLogo.childImageSharp.gatsbyImageData} alt={parse(title)} /></Link>
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

const query = graphql`query LogoAndGeneralQuery {
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
              gatsbyImageData(width: 200, placeholder: NONE, layout: FIXED)
            }
          }
          mobileLogo: localFile {
            childImageSharp {
              gatsbyImageData(width: 140, placeholder: NONE, layout: FIXED)
            }
          }
        }
      }
    }
  }
  training: file(name: {eq: "icon-training"}) {
    childImageSharp {
      gatsbyImageData(width: 50, placeholder: NONE, layout: CONSTRAINED)
    }
  }
}
`