import React, { useEffect } from "react"
import Nav from './nav'
import Footer from './footer'
import Whatsapp from "./whatsapp"

const Layout = ({ isHomePage, children }) => {

  let WOW;
  useEffect(() => {
    let WOW = require("wowjs");
    new WOW.WOW({live: false, animateClass: 'animate__animated'}).init();
  }, []);

  useEffect(() => {
    if (WOW) {
      WOW.sync();
    }
  });

  return (
    <div className="global-wrapper" data-is-root-path={isHomePage}>
      <Nav />
      <main>
        <Whatsapp />
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
