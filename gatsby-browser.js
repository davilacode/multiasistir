/* CSS */
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css/animate.min.css";
import "./src/assets/css/style.css"

/* JS */
import "bootstrap/dist/js/bootstrap.min.js";
import "@popperjs/core/dist/umd/popper.min.js";

/* APOLLO CLIENT */
import React from "react"
import { ApolloProvider } from "react-apollo"
import { client } from "./src/context/ApolloContext"


export const wrapRootElement = ({ element }) => (
    <ApolloProvider client={client}>{element}</ApolloProvider>
)