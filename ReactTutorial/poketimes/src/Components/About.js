import React from 'react'
import Rainbow from '../hoc/Rainbow'

const About = () => {

  return (

    <div className="container">

      <h4 className="center">About</h4>

      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores amet quasi autem similique libero modi mollitia dolore, quibusdam ipsa delectus cum dignissimos necessitatibus, ducimus vero, numquam nostrum tenetur nisi odio?</p>

    </div>

  )

  }  

 // This is where we make our component a SUPER component 

export default Rainbow(About)