const selectedSerie = (state = "", action) => {
    if (action.type == "clickOnSingle") {
      return action.selectedSerie;
    } else {
      return state;
    }
  }
  
  export default selectedSerie;
  