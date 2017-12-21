function nutSerie(state = [], action) {
    var newState = state.concat();
    
    if (action.type === "addToNuts") {
        newState.push(action.nutSerie);
      return newState;

    } else if (action.type === "delFromNuts") {
      newState.push(action.nutSerie);
      return newState;

    } else {
      return state;
    }
  }
  
  export default nutSerie;
  