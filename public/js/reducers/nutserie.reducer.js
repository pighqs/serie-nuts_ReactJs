const nutSerie = (state = [], action) => {
  let newState = state.concat();

  switch (action.type) {

    case "addToNuts":
      newState.push(action.nutSerie);
      return newState;
      break;

    case "delFromNuts":
      let indexToDel = newState.indexOf(action.nutSerie);
      if (indexToDel === -1) {
        return newState;
      } else {
        newState.splice(indexToDel, 1);
        return newState;
      }
      break;

    case "checkFavs":
      return action.favsFromDB;
      break;
      
    default:
      return state;
  }
}

export default nutSerie;
