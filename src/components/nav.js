import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Nav = () => {

    const {
        wp: {
          	generalSettings: { title },
        },
		wp: {
			siteGeneralSettings: { 
				ACFTopMenu: { eMail, socialMedia, phones}
			},
		},
    } = useStaticQuery(graphql`
		query TopMenuAndLayoutQuery {
			wp {
			generalSettings {
				title
				description
			}
			siteGeneralSettings {
				ACFTopMenu {
				socialMedia {
					socialNetwork {
					meta
					url
					icon {
						localFile {
						publicURL
						}
					}
					}
				}
				eMail {
					eMail
					meta
					icon {
					localFile {
						publicURL
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
						publicURL
					}
					}
				}
				}
			}
			}
		}
    `)

    return (
        <header>  
			<nav className="navbar navbar-expand-lg bg-gray-middle">
				<div className="container justify-content-end top-menu">
					<div>
						<ul className="d-flex">
							{ 
								socialMedia[0].socialNetwork.map(( social, key) => {
									return (
										<li key={key}> <a href={social.url} target={`_blank`} rel={`noreferrer noopener`} title={social.meta} > <img src={social.icon.localFile.publicURL} alt={social.meta} /></a></li>
									)
								}) 
							}
						</ul>
					</div>
					<div className="d-flex align-items-center ">
						<img src={phones[0].icon.localFile.publicURL} alt={phones[0].meta} />
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
						<img src={eMail[0].icon.localFile.publicURL} alt={eMail[0].meta} />
						<ul>
							<li><a href={`mailto:${eMail[0].eMail}`} title={eMail[0].meta}>{eMail[0].eMail}</a></li>
						</ul>
					</div>
				</div>
			</nav>
			<nav className="navbar navbar-expand-lg">
				<div className="container">
					<Link to="/" className="navbar-brand"><img src="" alt=""/></Link>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
				</div>
			</nav>
        </header>
    )
}


export default Nav