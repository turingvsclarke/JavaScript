import React from 'react'
import {Link,NavLink,withRouter} from 'react-router-dom'

// We are going to have a function-based component that will return a super dope navigation bar

const Navbar = () => {

  return (

    // From materialize css we automatically have the ability to create a navigation bar with whatever color we can imagine

    <nav className="nav-wrapper red darken-3">

    {/* We also automatically have some sick containers that keep the text all in one place nicely */}

      <div className="container">

        <a className="brand-logo">Poke Times</a>

        {/* We are going to create an unordered list across the right side of the nav bar that displays different links and their titles */}

        <ul className="right">

          <li><Link to = "/">Home</Link></li>
          <li><NavLink to = "/About">About</NavLink></li>
          <li><Link to = "/Contact">Contact</Link></li>

        </ul>

      </div>

    </nav>

  )

  }  

export default withRouter(Navbar)