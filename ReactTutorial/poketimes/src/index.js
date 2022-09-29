import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './Reducers/rootReducer'

// we're declaring a store that we will wrap the app in
// We pass the reducer to the store so that it knows which reducer its going to work with

const store = createStore(rootReducer);

// We're going to render the app wrapped up in a store provider that lets the app interact with the store

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
