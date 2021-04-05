import React from "react"
import Img from "gatsby-image"

const TitleIntern = ({ title, image }) => {

    return (
        <section className="wrap_banner_intern">
            <Img fluid={image} alt={title} />
            <h1 className="wow animate__fadeInUp">{title}</h1>
        </section>
    )
}

export default TitleIntern