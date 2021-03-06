import * as React from "react";
import { Link } from 'gatsby';
import { Helmet } from "react-helmet";

const listStyles = {
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gridGap: '20px',
  padding: 0,
  margin: '20px 0 100px',
}

const Header = () =>  (
  <header style={{width: '100%'}}>
    <Helmet title={'helmet title'}/>
      <ul style={listStyles}>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/services'>Services</Link>
        </li>
      </ul>
  </header>
)

export default Header;