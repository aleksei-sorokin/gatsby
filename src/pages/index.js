import * as React from 'react';
import Header from '../components/header';
import { graphql, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

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

const submit = (event) => {
  event.preventDefault();
  const result = document.querySelector('.result');

  console.log('event', event);
  fetch('/', {
    body: new FormData(event.target),
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'POST',
  })
    .then(() => {
      result.innerHTML = 'Success';
    })
    .catch((error) => {
      result.innerHTML = `Failed: ${error}`;
    });
};

// markup
const IndexPage = ({ data }) => {
  const { nodes } = data.allMarkdownRemark;
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
      <div className='result'></div>

      <form name='contact' method='POST' data-netlify='true'>
        <p>
          <label>
            Your Name: <input type='text' name='name' />
          </label>
        </p>
        <p>
          <label>
            Your Email: <input type='email' name='email' />
          </label>
        </p>
        <p>
          <label>
            Your Role:{' '}
            <select name='role[]' multiple>
              <option value='leader'>Leader</option>
              <option value='follower'>Follower</option>
            </select>
          </label>
        </p>
        <p>
          <label>
            Message: <textarea name='message'></textarea>
          </label>
        </p>
        <p>
          <button type='submit'>Send</button>
        </p>
      </form>
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
