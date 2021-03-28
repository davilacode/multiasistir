import React from "react"
import Nav from './nav'

const Layout = ({ isHomePage, children }) => {

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <Nav />
      <main>{children}</main>

      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` `}
        And <a href="https://wordpress.org/">WordPress</a>
      </footer>
    </div>
  )
}

export default Layout
