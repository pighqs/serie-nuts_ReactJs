const activeFilter = (state = {activeFilter:"all"}, action) => {
    
    if (action.type == "filter") {
      return { activeFilter: action.activeFilter };
    } else {
      return state;
    }
  }
  
  export default activeFilter;

