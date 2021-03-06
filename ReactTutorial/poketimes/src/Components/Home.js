import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Pokeball from './pokeball.png'
import {connect} from 'react-redux'

// Creating a class based component to be able to use lifestyle hooks

class Home extends Component {

/* All of this is now gone because we are going to use redux, rendering states and external data requests within components useless  
    
// We're gonna store the state of this component as all the posts that we are going to grab

state = {

  posts:[]

}

// We are going to go get some data once the home component has already been mounted to the DOM

  componentDidMount(){

   
    // axios is an HTTP client that will allow us to make http requests, i.e. go get some data from somewhere

    // right now we are going to get some data from this website. we have no idea when we are going to get the data exactly so we use .then which runs code once the above has run

    axios.get('https://jsonplaceholder.typicode.com/posts/')

    // we're going to use a function that will take the results 'res' and do something with them. Particularly change the state of the component to include all these fancy post datums

    .then(res=>{

      console.log(res);
      // Each post has a property data so we are going to take all this data and put the first ten values in the state of our component

      this.setState({

        posts:res.data

      });
    })
  }

  */

  render() {

    console.log(this.props)

    // we are going to assign the state(the array of posts) to a posts variable

    const posts = this.props;

    // We now want to get some JSX depending on whether or not we have any posts

    const postList = posts.length ? (

      // if there are posts, we want to cycle through all the posts and return JSX that renders the title and body like a post card 

      posts.map(post=>{

        return(

          // For each post we return a post card with the title and main body of the post thx to materialize css

          <div className="post card" key={post.id}>

            {/* Each post now has an image of a pokeball on it */}

            <img src={Pokeball} alt="a pokeball"/>

            <div className="card-content">

              {/* For each component we are going to surround the title with a link that routes it to a page with its id as a route parameter */}

              <Link to = {'/' + post.id}>

                <span className="card-title red-text">{post.title}</span>

              </Link>

              <p>{post.body}</p>

            </div>

          </div>

        )}
      ))
        : (

      // otherwise we are going to return something that just says there are no posts to show right now
      
      <div className="center">No posts to show right now</div>
    )

    return (

      // At the end we return a main home page that has a list of all the posts neatly contained

    <div className="container home">

      <h4 className="center">Home</h4>

        {postList}

    </div>

  )
   }
  }  

// We are now creating a function that maps a state to the props of this component. We're going to pass it to the connect function eventually, meaning it will 
// this is basically our subscription, allowing the component to access the state and use it. It returns the props we want to add to the component

const mapStateToProps=(state)=>{

  return{

    posts:state.posts

  }

}

// connect is a function which returns a higher order component, and THAT is what we want to wrap our Home component in
// We are passing it the function so its going to know to go to the state of the store and return the posts part of that state
// It takes the state but also the return of the function tells what props we want the supercharged component to add to the component

export default connect(mapStateToProps)(Home)