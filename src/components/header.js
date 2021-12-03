import * as React from "react";
import { Link } from 'gatsby';

import icon from '../images/icon.png'

const Header = () =>  (
  <header>
    <h1>Header</h1>
    <Link to="/">Home</Link>
  </header>
)

export default Header;