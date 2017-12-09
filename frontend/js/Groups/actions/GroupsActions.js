import { SET_GROUPS_LIST } from '../constants/GroupsConstants';
export function getGroups() {
    return (dispatch) => {
      console.log(localStorage.token);
      fetch('http://127.0.0.1:3000/api/user/groups', {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUPS_LIST, groups: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}
