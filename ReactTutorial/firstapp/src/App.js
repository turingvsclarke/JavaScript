import React, { Component } from 'react';
import Ninjas from './Ninjas'
import AddNinja from './AddNinja'

class App extends Component {
  state = {
    ninjas: [
      {name:'Quinoa',age:25,belt:'orange',id:1},
      {name:'Haiku',age:38,belt:'brown',id:2},
      {name:"Jake",age:9,belt:'white',id:3},
      {name:"Ezra",age:8,belt:'yellow',id:4},
      {name:"yoshi",age:28,belt:'yellow',id:5}

    ]
  }

  addNinja = (newNinja)=>{

    newNinja.id = this.state.ninjas.length+1;

    let ninjas = this.state.ninjas

    ninjas.push(newNinja)

    this.setState({

      ninjas: ninjas
    });

  }

  deleteNinja=(id)=>{

    let ninjas = this.state.ninjas.filter(ninja=>ninja.id!==id);

    this.setState({

      ninjas:ninjas

    })

  }

  render() {
    return (
      <div className="App">

        <h1>Welcome!</h1>
        <p>This is my first react app</p>
        <Ninjas ninjas={this.state.ninjas} deleteNinja={this.deleteNinja}/>
        <AddNinja addNinja = {this.addNinja}/>
      </div>
    );


  }
}

export default App;
