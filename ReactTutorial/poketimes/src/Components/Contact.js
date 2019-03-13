import React from 'react'
import Rainbow from '../hoc/Rainbow'

const Contact = (props) => {

/* This code is cool. It allows us to wait 2 seconds and then go to a different page. It uses a time-delay function and the property 'history' of the component

setTimeout(()=>{

    props.history.push('/About')

}

,2000)

*/

// This is boiler-plate stuff to return. We have a container class with a centered header and some text below

  return (

    <div className="container">

      <h4 className="center">Contact</h4>

      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores amet quasi autem similique libero modi mollitia dolore, quibusdam ipsa delectus cum dignissimos necessitatibus, ducimus vero, numquam nostrum tenetur nisi odio?</p>

    </div>

  )

  }  

export default Contact