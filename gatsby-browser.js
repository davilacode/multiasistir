/* CSS */
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "@fontsource/montserrat/100.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/500.css"
import "@fontsource/montserrat/700.css"
import "@fontsource/montserrat/900.css"
import "./src/assets/css/style.css";

/* JS */
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";

/* APOLLO CLIENT */
import React from 'react'
import fetch from 'cross-fetch'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const RECPATCHA_KEY = process.env.GATSBY_RECAPTCHA_SITE_KEY

const client = new ApolloClient({
    uri: `https://api.multiasistir.com/graphql`,
    fetch
})

export const wrapRootElement = ({ element }) => (
  <GoogleReCaptchaProvider reCaptchaKey={RECPATCHA_KEY}>
    <ApolloProvider client={client}>{element}</ApolloProvider>
  </GoogleReCaptchaProvider>
)