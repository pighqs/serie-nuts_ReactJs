const currentUser = (state = "", action) => {
  if (action.type == "logged") {
    return action.currentUser;
  } else {
    return state;
  }
}

export default currentUser;
