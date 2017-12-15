function activeFilter(state= {activeFilter:"all"}, action) {
    
    if (action.type == "filter") {
 //       console.log(action.activeFilter)
      return { activeFilter: action.activeFilter };
    } else {
      return state;
    }
  }
  
  export default activeFilter;

