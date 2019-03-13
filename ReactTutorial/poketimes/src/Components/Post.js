import React, {Component} from 'react'
import axios from 'axios'

// We're defining a component that will be a single post

class Post extends Component{

// We now define the post to have a state with its route parameter, which we are calling id, as its id. It starts off null then the id is set when we mount this component

state={

    // id: null

    // instead we are going to let the state of the post be the post we get from our dummy data request

    post: null

}

// We want to find the route parameter that takes us to the page. We are finding it when the component is routed

componentDidMount(){

    // The parameter is already going to be defined as a prop by the router so we can just grab that parameter easily

    let id=this.props.match.params.post_id

    // We are going to go out and get that post at its id. The id was part of the post when we got it in Home so that is the right link.
    // , we're just now making it our post state so we can use it in our own browser to our own page

    axios.get('https://jsonplaceholder.typicode.com/posts/' + id)

    // Once we've gotten the id, we are going to take the post that we get and let it be the state of our post

    .then (res=>{

    this.setState({

        post: res.data

    })
    })
}

render(){

    // We're going to set a post to either be the post we requested (nicely titled) or a loading message if we don't have the post yet

    const post= this.state.post ? (

        <div className="post">

            <h4 className="center">{this.state.post.title}</h4>

            <p>{this.state.post.body}</p>

        </div>

    ):(

        <div className="center">Loading post...</div>

    )

    // In our return statement we return a container with the post we made above in the render function

    return(

        <div className="container">

       {/* <h4>{this.state.id}</h4> */}

            {post}

        </div>

    )
}
}

export default Post