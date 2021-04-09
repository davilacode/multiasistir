import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

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
                            <Img fluid={banner.image.localFile.childImageSharp.fluid} className="d-block w-100" alt={banner.title} />
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
                image {
                    localFile {
                        childImageSharp {
                            fluid(maxWidth: 1920, quality: 100) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
            }
            }
        }
        }
    }
`