export function getSystemsList() {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/listsystems', {
        headers: {
          "token": localStorage.token
        }
      }).then((data) => {
        dispatch({ type: SET_SYSTEMS_LIST, data });
      }).catch((error) => {
        console.log("There was an internal error");
      });
    }
}
