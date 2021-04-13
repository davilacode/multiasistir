import React from "react"
import { graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import SEO from "../components/seo"
import TitleIntern from "../components/titleIntern"

const Us = ({data}) => {

  const detail = data.wpPage
  const mision = data.wpPage.ACFUs.additionalfields[0]
  const vision = data.wpPage.ACFUs.additionalfields[1]
  const principles = data.wpPage.ACFUs.additionalfields[2]
  const values = data.wpPage.ACFUs.additionalfields[3]
  const videos = data.wpPage.ACFUs.videos

  return (
    <Layout>
      <SEO title={detail.title} />
      <TitleIntern title={detail.title} image={detail.featuredImage.node.localFile.childImageSharp.fluid} />
      <div className="wrap_content container py-5">
        <div className="row">
          <div className="col-12">
            {parse(detail.content)}
          </div>
        </div>
      </div>
      <section className="bg-blue-middle">
        <div className="wrap_content container pt-3 pb-5">
          <div className="row">
              <div className="col-12 txt-white">
                <h2 className="txt-white mision-title pt-5">{mision.title}</h2>
                {parse(mision.text)}
              </div>
              <div className="col-12 txt-white">
                <h2 className="txt-white vision-title pt-5">{vision.title}</h2>
                {parse(vision.text)}
              </div>
          </div>
        </div>
      </section>
      {videos && 
        <section className="bg-gray-clear">
          <div className="wrap_content container py-5">
            <div className="row">
              <div className="col-12 pb-3">
                <h2>Videos</h2>
              </div>
              {videos.map(({link, title}, i) => {
                let embedId = link.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];

                return (
                  <div className="col-md-6" key={i}>
                    <iframe
                      width="100%"
                      height="480"
                      src={`https://www.youtube.com/embed/${embedId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      }
      <section className="py-5">
        <div className="wrap_content container py-5">
          <div className="row">
            <div className="col-12">
              <div className="accordion" id="accordionExample">
                <div class="accordion-item pb-5">
                  <h2 class="accordion-header txt-white" id="headingOne">
                    <button class="accordion-button bg-blue-middle py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                      {principles.title}
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      {parse(principles.text)}
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header txt-white" id="headingTwo">
                    <button class="accordion-button bg-blue-middle py-4 collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      {values.title}
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      {parse(values.text)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Us

export const pageQuery = graphql`
  query UsQuery (
    $id: String
  ){
    wpPage(id: {eq: $id}) {
      uri
      title
      content
      ACFUs {
        additionalfields {
          text
          title
        }
        videos {
          link
          title
        }
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              fluid (maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
