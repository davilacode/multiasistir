import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"

const Nav = () => {

    const {
        wp: {
          generalSettings: { title },
        },
      } = useStaticQuery(graphql`
        query LayoutQuery {
          wp {
            generalSettings {
              title
              description
            }
          }
        }
    `)

    return (
        <header className="global-header">
            <h1 className="main-heading">
                <Link to="/">{parse(title)}</Link>
            </h1>
        </header>
    )
}


export default Nav