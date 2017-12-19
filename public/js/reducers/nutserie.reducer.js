function nutSerie(state = [], action) {
    var newState = state.concat();
    //console.log(initialState);
    
    if (action.type == "addToNuts") {
        newState.push(action.nutSerie);
      return newState;
    } else {
      return state;
    }
  }
  
  export default nutSerie;
  