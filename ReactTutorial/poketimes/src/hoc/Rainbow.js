import React from 'react'

// This is sort of a cheap higher order component because it basically just does what some css would do. It supercharges any component we want
// This component is function-based. It is particularly a function of some unidentified component we would want to supercharge

const Rainbow = (WrappedComponent) => {

    // We first randomly pick one of a list of colors

    const colours = ['red','pink','orange','blue','green','yellow'];

    const randomColour = colours[Math.floor(Math.random()*5)]
 
    // Any sort of colored text has className="color-text"

    const className = randomColour + '-text';

    // This function is going to return the component and whatever props it already had wrapped with tags that makes its text a certain color
    // Thus we need to pass it the props that it already had so we can make things cooler but augmented

    return (props) => (

            <div className={className}>

                <WrappedComponent {...props} />

            </div>

        )
    }


export default Rainbow