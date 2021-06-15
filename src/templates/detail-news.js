import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage } from "gatsby-plugin-image";

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import Seo from "../components/Seo"
import TitleIntern from "../components/titleIntern"

const BlogPostTemplate = ({ data: { previous, next, post, bannerNews } }) => {
  const bannerImage = {
    fluid: bannerNews.childImageSharp?.gatsbyImageData
  }

  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData
  }

  return (
    <Layout>
      <Seo title={post.title} description={post.excerpt} />
      <TitleIntern title={`Noticias`} image={bannerImage.fluid} />
      <div className="wrap_content container py-5">
        <div className="row">
          <div className="col-12">
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header> 
                <div className="row">
                  <div className="col-md-7 p-5 order-md-1 order-2">
                    <time>{post.date}</time>
                    <h2 className="pt-3">{post.title}</h2>
                    {parse(post.excerpt)}
                  </div>
                  <div className="col-md-5 p-0 order-md-2 order-1">
                    <GatsbyImage image={featuredImage?.gatsbyImageData} />
                  </div>
                </div>
              </header>
              
              {!!post.content && (
                <section itemProp="articleBody" className="pt-5">{parse(post.content)}</section>
              )}

              <hr />

              <footer>
              </footer>
            </article>
            <nav className="blog-post-nav">
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={`/noticias${previous.uri}`} rel="prev">
                      ← {parse(previous.title)}
                    </Link>
                  )}
                </li>

                <li>
                  {next && (
                    <Link to={`/noticias${next.uri}`} rel="next">
                      {parse(next.title)} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      
    </Layout>
  );
}

export default BlogPostTemplate

export const pageQuery = graphql`query BlogPostById($id: String!, $previousPostId: String, $nextPostId: String) {
  post: wpPost(id: {eq: $id}) {
    id
    excerpt
    content
    title
    date(formatString: "MMMM DD, YYYY", locale: "es")
    featuredImage {
      node {
        altText
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 100, placeholder: TRACED_SVG, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
  previous: wpPost(id: {eq: $previousPostId}) {
    uri
    title
  }
  next: wpPost(id: {eq: $nextPostId}) {
    uri
    title
  }
  bannerNews: file(name: {eq: "banner-intern-services"}) {
    childImageSharp {
      gatsbyImageData(quality: 90, layout: FULL_WIDTH)
    }
  }
}
`
