import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const Banners = () => {

    const {
        wp: {
            banners: { 
                ACFBanners: { bannersHome }
            },
        }
    } = useStaticQuery(query)

    return (
        <div>
            <div id="homeBanner" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    { bannersHome && bannersHome.map((banner, i) => (
                        <div className={`carousel-item ${i === 0 ? 'active' : ''}`} key={i}>
                            { banner.link ? 
                                <Link to={banner.link} target={banner.extern ? '_blank' : ''} rel="noreferrer noopener">
                                    <GatsbyImage image={banner?.image?.localFile?.childImageSharp?.gatsbyImageData} className={`d-block w-100 res-${banner.textAlign}`} alt={banner.title} />
                                </Link>
                            : 
                                <GatsbyImage image={banner?.image?.localFile?.childImageSharp?.gatsbyImageData} className={`d-block w-100 res-${banner.textAlign}`} alt={banner.title} />
                            }
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#homeBanner" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#homeBanner" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>        
    )
}

export default Banners

const query = graphql`
    query bannersHome {
        wp {
        banners {
            ACFBanners {
            bannersHome {
                fieldGroupName
                html
                link
                title
                textAlign
                extern
                image {
                    localFile {
                        childImageSharp {
                            gatsbyImageData(
                                layout: FULL_WIDTH,
                                quality: 100
                            )
                        }
                    }
                }
            }
            }
        }
        }
    }
`