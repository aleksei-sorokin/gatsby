import * as React from "react";
import Header from "../components/header";
import {graphql} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const pageStyles = {
  color: "#232129",
  padding: '0 96px 20px',
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  display: 'flex',
  flexWrap: 'wrap'
}

const divLeft = {
  width: 'calc(65% - 20px)',
  padding: '0 20px 0 0'
}

const divRight = {
  width: 'calc(35% - 20px)',
  padding: '0 0 0 20px'
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gridGap: '20px',
  width: '100%'
}

const formInput = {
  height: 35,
  width: '100%',
  padding: 10,
  boxSizing: 'border-box'
}

const formButtonStyle = {
  height: 40,
  width: '100%',
  fontSize: 20,
  cursor: 'pointer'
}

const Article = ({data}) => {
  const {html} = data.markdownRemark;
  const {title, image} = data.markdownRemark.frontmatter;
  const img = getImage(image);
  return (
    <div style={pageStyles}>
      <Header/>
      <div style={divLeft}>

        <h1 style={{marginBottom: 20}}>{title}</h1>
        <div>
          <GatsbyImage alt={title} image={img}/>
        </div>
        <div dangerouslySetInnerHTML={{__html: html}}/>
      </div>
      <div style={divRight}>
        <form action="" style={formStyle}>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" style={formInput}/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" style={formInput}/>
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input type="tel" name="phone" style={formInput}/>
          </div>
          <div>
            <button style={formButtonStyle}>Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Article;

export const query = graphql`
    query PostQuery($url: String) {
        markdownRemark(frontmatter: {url: {eq: $url}}) {
            html
            frontmatter {
                title
                url
                category
                image {
                    childImageSharp {
                        gatsbyImageData(width: 300, quality: 95)
                    }
                }
            }
        }
    }

`