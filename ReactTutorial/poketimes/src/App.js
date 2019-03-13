import React, {Component} from 'react'
import NavBar from './Components/Navbar'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Home from './Components/Home'
import Contact from './Components/Contact'
import About from './Components/About'
import Post from './Components/Post'

class App extends Component {

  render(){

    return(

// Everything is within the browser router. Route allows us to redirect to new components and their respective pages

      <BrowserRouter>
      
        <div className="App">

          <NavBar />

          <Switch>

          {/* These are all our routes so that react switches between different components and the requests get intercepted before making it to the server */ }

          <Route exact path='/' component={Home}/>

          <Route path = "/About" component={About}/>

          <Route path = "/Contact" component={Contact}/>

          {/* We now are defining a route parameter meaning we type random stuff after / and get a new page. We want each new page to be a unique post */}

          {/* We want it to take us to a post component */}

          <Route path = "/:post_id" component={Post}/> 

          </Switch>

        </div>
      
      </BrowserRouter>

    )


  }

}
export default App