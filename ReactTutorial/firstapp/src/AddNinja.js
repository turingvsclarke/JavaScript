import React, { Component } from 'react';

class AddNinja extends Component {

state = {
    name:null,
    age:null,
    belt:null,
}

/* add these states to the ninja list */

handleSubmit=(e)=>{

    e.preventDefault();

    this.props.addNinja(this.state);

}

handleChange=(e)=>{

    this.setState({

    [e.target.id]: e.target.value

    });

}


render() {

    return(
        <div>
            <form onSubmit={this.handleSubmit}>
                Enter the new ninja's name here: <input type="text" id = "name" onChange={this.handleChange}/><br/>
                Enter the new ninja's age here: <input type="text" id = "age" onChange={this.handleChange}/><br/>
                Enter the new ninja's belt here: <input type = "text" id = "belt" onChange={this.handleChange}/><br/>
                <button>Submit</button>
            </form>
        </div>
    )

}

}

export default AddNinja



