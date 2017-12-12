import React from 'react';
import ReactDOM from 'react-dom';


//Initialisation de Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux'

// initialisation Router
import { BrowserRouter } from 'react-router-dom';

import RoutesList from './js/components/routesList';

import Home from './js/components/Home';
import Other from './js/components/Other';


function Reducer(state, action) {
  if(action.type == 'yolo') {
      console.log("yolo")
  } else {
    console.log("else")
  }
}

const store = createStore(Reducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutesList/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("container")
);
