function nutSerie(state = [], action) {
  var newState = state.concat();

  if (action.type === "addToNuts") {
    newState.push(action.nutSerie);
    console.log(newState);
    return newState;
    
  } else if (action.type === "delFromNuts") {
    var indexToDel = newState.indexOf(action.nutSerie);
    if (indexToDel === -1) {
      return newState;
    } else {
      newState.splice(indexToDel, 1);
      console.log(newState);
      return newState;
    }
  } else if (action.type ==="checkFavs") {
    console.log(action.favsFromDB);
    return action.favsFromDB;
  }
  
  else {
    return state;
  }
}

export default nutSerie;
