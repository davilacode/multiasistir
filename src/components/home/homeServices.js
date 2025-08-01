import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Services = ({ data }) => {

    const { file: { childImageSharp: {iconPlus} } } = useStaticQuery(iconQuery)

    return (
        <section className="wrap_home_services">
            <div className="container">
                <div className="row">
                    <div className="col-12 wrap_content">
                        <h2>AFILIATE A NUESTROS PLANES</h2>
                    </div>
                    {data && data.map((service, index) => {
                        let featuredImage = {
                            fluid: service.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
                        }
                        return (
                            <a className=" col-lg-4 wow animate__fadeInUp" key={service.id} href={service.uri} title={service.title} style={{animationDelay: `${index * 200 + 200}ms`}}> 
                                <div className="align-items-center d-flex flex-column justify-content-between">
                                    <div>
                                        {featuredImage?.fluid && 
                                            <GatsbyImage image={featuredImage.fluid} alt={service.title} />
                                        }
                                        <h3 className="text-center text-uppercase txt-blue-middle">{service.title}</h3>
                                        <p>{service.ACFLeadServices?.leadHome && parse(service.ACFLeadServices.leadHome)}</p>
                                    </div>
                                    <GatsbyImage image={iconPlus} alt="Icono más"/>
                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Services

const iconQuery = graphql`query iconQuery {
  file(name: {eq: "icon-plus"}) {
    id
    childImageSharp {
      iconPlus: gatsbyImageData(width: 28, height: 28, layout: FIXED)
    }
  }
}
`