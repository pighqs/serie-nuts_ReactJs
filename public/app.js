import React from 'react';
import ReactDOM from 'react-dom';


//Initialisation de Redux
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

// initialisation Router
import { BrowserRouter } from 'react-router-dom';

import RoutesList from './js/components/routesList';

import Home from './js/components/Home';

import searchRequest from './js/reducers/search.reducer';
import activeFilter from './js/reducers/filter.reducer';
import selectedSerie from './js/reducers/selectedserie.reducer';

const globalReducers = combineReducers({searchRequest, selectedSerie, activeFilter});



const store = createStore(globalReducers, {selectedSerie: "1161"} );

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RoutesList/>
    </BrowserRouter>
  </Provider>,
  document.getElementById("container")
);
