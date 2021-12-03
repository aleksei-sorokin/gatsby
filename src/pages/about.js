import * as React from "react"
import Header from "../components/header";

// styles
const pageStyles = {
  color: "#232129",
  padding: '0 96px 20px',
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
// markup
const AboutPage = () => {
  return (
    <main style={pageStyles}>
      <Header/>
      <h1 style={{marginBottom: 20}}>About Page</h1>

    </main>
  )
}

export default AboutPage