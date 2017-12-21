function nutSerie(state = [], action) {
  var newState = state.concat();

  if (action.type === "addToNuts") {
    newState.push(action.nutSerie);
    return newState;
    
  } else if (action.type === "delFromNuts") {
    var indexToDel = state.indexOf(action.nutSerie);
    if (indexToDel === -1) {
      return state;
    } else {
      newState.splice(indexToDel, 1);
      return newState;
    }
  } else {
    return state;
  }
}

export default nutSerie;
