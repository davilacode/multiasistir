import React from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import parse from "html-react-parser"

const TitleIntern = ({ title, image, date, excerpt }) => {

    return (
        <section className={`wrap_banner_intern ${ date ? 'layer' : ''}`}>
            <GatsbyImage image={image} alt={title} />
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