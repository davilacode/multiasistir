import React from "react"
import Img from "gatsby-image"
import parse from "html-react-parser"

const TitleIntern = ({ title, image, date, excerpt }) => {

    return (
        <section className={`wrap_banner_intern ${ date ? 'layer' : ''}`}>
            <Img fluid={image} alt={title} />
            <div className="content_banner">
                <h1 className="wow animate__fadeInUp">{title}</h1>
                {excerpt && 
                    <span className="banner_excerpt txt-white wow animate__fadeInUp">{parse(excerpt)}</span>
                }
                {date && 
                    <span className="banner_date txt-white wow animate__fadeInUp">{date}</span>
                }
            </div>
        </section>
    )
}

export default TitleIntern