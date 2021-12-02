import * as React from "react";
import { Link } from 'gatsby';

import icon from '../images/icon.png'

const Header = () =>  (
  <header>
    <h1>title</h1>
    <Link to="/">
      <img src={icon} alt="icon"/>
    </Link>
  </header>
)

export default Header;