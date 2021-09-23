import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"

const Pbs = () => {
    
    const data = useStaticQuery(imageQuery);

    const pbsServices = data.wpPage.ACFPbsServices;
    const services = pbsServices.services;

    return (
        <section className="wrap_pbs_services">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pb-5">{pbsServices.title}</h2>
                    </div>
                    { services?.map(({title, icon, lead, url}, i) => {
                      return (
                        <div className="col-md-6 mb-4 col-lg-3 wow animate__fadeInRight" key={i+"service"} style={{animationDelay: `${i}00ms`}}>
                          <a className="bg-white align-items-center d-flex flex-column p-4 list-services" href={url}>
                              <strong className="txt-blue-dark d-block text-center fs-6 mb-2">{title}</strong>
                              <GatsbyImage image={icon?.localFile?.childImageSharp?.gatsbyImageData} alt={title} />
                              <p className="text-center">{lead}</p>
                              <span>Ver más +</span>
                          </a>
                      </div>
                      )
                    })}
                </div>
            </div>
        </section>
    );
}

export default Pbs

const imageQuery = graphql`
query pbsServices {
  wpPage(slug: {eq: "servicios"}) {
    title
    ACFPbsServices {
      services {
        icon {
          localFile{
            childImageSharp {
              gatsbyImageData(width: 99, placeholder: NONE, layout: FIXED)
            }
          }
        }
        lead
        title
        url
      }
      title
    }
  }
}
`