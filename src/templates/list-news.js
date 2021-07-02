import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Layout from "../components/layout"
import Seo from "../components/seo"
import TitleIntern from "../components/titleIntern"
import { GatsbyImage } from "gatsby-plugin-image";

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allWpPost.nodes
  const intern = data.intern

  if (!posts.length) {
    return (
      <Layout>
        <Seo title={intern.title} />
        <TitleIntern title={intern.title} image={intern.featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
        <p>
          No hay contenido para mostrar
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={intern.title} />
      <TitleIntern title={intern.title} image={intern.featuredImage.node.localFile.childImageSharp.gatsbyImageData} />
      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            <ul className="list-news">
              {posts.map(post => {
                const title = post.title

                return (
                  <li key={post.uri} className="pt-5">
                    <Link to={`/noticias${post.uri}`} itemProp="url">
                      <article>
                        <GatsbyImage
                          image={post?.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData} />
                        <header>
                          <h2 className="bg-blue-middle px-4 py-3 mb-0 txt-white text-uppercase animate__animated animate__fadeInLeft">{parse(title)}</h2>
                        </header>
                        <section className="animate__animated txt-white">
                          <span className="title-news animate__animated">{parse(title)}</span>
                          <span className="animate__animated txt-white excerpt-news">{parse(post.excerpt)}</span>
                          <span className="animate__animated btn-link mx-auto">Ver más</span>
                        </section>
                      </article>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {previousPagePath && (
              <>
                <Link to={previousPagePath}>Previous page</Link>
                <br />
              </>
            )}
            {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogIndex

export const pageQuery = graphql`query WordPressPostArchive($id: String!, $offset: Int!, $postsPerPage: Int!) {
  allWpPost(
    sort: {fields: [date], order: DESC}
    limit: $postsPerPage
    skip: $offset
  ) {
    nodes {
      excerpt
      uri
      date(formatString: "MMM DD, YYYY", locale: "es")
      title
      excerpt
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData(quality: 100, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
  intern: wpPage(id: {eq: $id}) {
    id
    uri
    title
    featuredImage {
      node {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
}
`
