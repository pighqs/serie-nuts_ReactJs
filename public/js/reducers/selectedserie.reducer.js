function selectedSerie(state = "1161", action) {
    if (action.type == "clickOnSingle") {
      // remplace valeur state searchRequest
      return action.selectedSerie;
    } else {
      return state;
    }
  }
  
  export default selectedSerie;
  