function searchRequest(state = { searchRequest: "" }, action) {
  if (action.type == "search") {
    // remplace valeur state searchRequest
    return { searchRequest: action.searchValue };
  } else {
    return state;
  }
}

export default searchRequest;
