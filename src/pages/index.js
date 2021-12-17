import * as React from 'react';
import Header from '../components/header';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Contact from '../components/Contact';

// styles
const pageStyles = {
  color: '#232129',
  padding: '0 96px 20px',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
};

const containerStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  marginTop: '20px',
};

const articleStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridGap: '20px',
};


// markup
const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
  console.log('env qwe ', process.env.GATSBY_QWE)
  console.log('env asd ', process.env.GATSBY_ASD)
  console.log('env node', process.env.NODE_ENV)
  return (
    <main style={pageStyles}>
      <Header />
      <h1 style={{ marginBottom: 20 }}>Home Page</h1>
      <div style={containerStyles}>
        {nodes.map((post) => {
          const { category, title, url, image } = post.frontmatter;
          const img = getImage(image);
          return (
            <div style={articleStyles} key={post.id}>
              <GatsbyImage alt={title} image={img} />
              <Link to={`/${category}/${url}`}>{title}</Link>
            </div>
          );
        })}
      </div>
      <Contact/>

   
    </main>
  );
};

export default IndexPage;

export const query = graphql`
  query MainPage {
    allMarkdownRemark {
      nodes {
        frontmatter {
          category
          title
          url
          image {
            childImageSharp {
              gatsbyImageData(formats: [AUTO, WEBP], width: 200, placeholder: BLURRED)
            }
          }
        }
        id
      }
    }
  }
`;
