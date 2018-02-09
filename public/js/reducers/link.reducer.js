const activeLink = (state= {activeLink:"home"}, action) => {
    
    if (action.type == "link") {
      return action.activeLink;
    } else {
      return state;
    }
  }
  
  export default activeLink;

