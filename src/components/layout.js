import React from "react"
import Nav from './nav'
import Footer from './footer'

const Layout = ({ isHomePage, children }) => {

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
