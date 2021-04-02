import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import TopMenu from "./topMenu"
import Menu from "./menu"
import parse from "html-react-parser"

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
    } = useStaticQuery(graphql`
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
							icon {
							localFile {
								publicURL
							}
							}
						}
						logo {
							localFile {
							publicURL
							}
						}
					}
				}
			}
		}
    `)

    return (
        <header>  
			<TopMenu />
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<Link to="/" className="navbar-brand"><img src={logo.localFile.publicURL} alt={parse(title)}/></Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#primeryMenu" aria-controls="primeryMenu" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<Menu />
					{ capacitacion && 
						capacitacion.map((link) => (
							<div>
								<a href={link.url} target={`_blank`} rel={`noreferrer noopener`} title={parse(link.label)}>
									<img src={link.icon.localFile.publicURL} alt={parse(link.label)}/>
									<span>{parse(link.label)}</span>
								</a>
							</div>
						)) 
					}
					
				</div>
			</nav>
        </header>
    )
}


export default Nav