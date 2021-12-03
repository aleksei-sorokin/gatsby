import * as React from "react";
import Header from "../components/header";
import {graphql} from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image";

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}

const Article = ({data}) => {
  const {html} = data.markdownRemark;
  const {title, url, category, image} = data.markdownRemark.frontmatter;
  const img = getImage(image);
  return (
    <div style={pageStyles}>
      <Header/>
      <h1>{title}</h1>
      <div>
        <GatsbyImage alt={title} image={img}/>
      </div>
      <div dangerouslySetInnerHTML={{__html: html}}/>
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