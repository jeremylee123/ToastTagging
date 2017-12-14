import { SET_GROUPS_LIST, SET_GROUPINFO, SET_GROUP_USER_INFO } from '../constants/GroupsConstants';
export function getGroups() {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/user/groups', {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUPS_LIST_I_MANAGE, groups: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
      fetch('http://127.0.0.1:3000/api/user/groups', {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUPS_LIST_I_AM_IN, groups: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}fetch('http://127.0.0.1:3000/api/user/groups', {
  method: "GET",
  headers: {
    "token": localStorage.token
  }
})
.then((resp) => resp.json())
.then((data) => {
  dispatch({type: SET_GROUPS_LIST_I_MANAGE, groups: data});
  return;
})
.catch((error) => {
  console.log("There was an internal error fetching systems");
  console.log(error);
  console.log("done printing error")
});

export function getGroupInfo(groupId) {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/groups?group_id=' + groupId, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUPINFO, groupInfo: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}

export function getGroupUsers(groupId) {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/groups/users?group_id=' + groupId, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUP_USER_INFO, groupUserInfo: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}

export function AddGroupUsers(groupId, username) {
      fetch('http://127.0.0.1:3000/api/groups/addUser?group_id=' + groupId + '&username=' +  username, {
        method: "POST",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
  }
export function AddSystemToGroup(groupId, systemId) {
      fetch('http://127.0.0.1:3000/api/groups/addSystem?group_id=' + groupId + '&serial_id=' +  systemId, {
        method: "POST",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
  }

  export function RemoveUserFromGroup(groupId, userId) {
            fetch('http://127.0.0.1:3000/api/groups/removeUser?group_id=' + groupId + '&user_id=' +  userId, {
              method: "DELETE",
              headers: {
                "token": localStorage.token
              }
            })
            .then((resp) => resp.json())
            .then((data) => {
              return;
            })
            .catch((error) => {
              console.log("There was an internal error fetching systems");
              console.log(error);
              console.log("done printing error")
            });
}

export function RemoveSystemFromGroup(groupId, systemId) {
          fetch('http://127.0.0.1:3000/api/groups/removeSystem?group_id=' + groupId + '&system_id=' +  systemId, {
            method: "DELETE",
            headers: {
              "token": localStorage.token
            }
          })
          .then((resp) => resp.json())
          .then((data) => {
            return;
          })
          .catch((error) => {
            console.log("There was an internal error fetching systems");
            console.log(error);
            console.log("done printing error")
          });
}

export function RemoveMyselfFromGroup(groupId) {
          fetch('http://127.0.0.1:3000/api/groups/currUser?group_id=' + groupId, {
            method: "DELETE",
            headers: {
              "token": localStorage.token
            }
          })
          .then((resp) => resp.json())
          .then((data) => {
            return;
          })
          .catch((error) => {
            console.log("There was an internal error fetching systems");
            console.log(error);
            console.log("done printing error")
          });
}

export function CreateGroup(groupName) {
  return (dispatch) => {
          fetch('http://127.0.0.1:3000/api/groups?groupName=' + groupName, {
            method: "POST",
            headers: {
              "token": localStorage.token
            }
          })
          .then((resp) => resp.json())
          .then((data) => {
            let gG = getGroups();
            gG(dispatch);
          })
          .catch((error) => {
            console.log("There was an internal error fetching systems");
            console.log(error);
            console.log("done printing error")
          });
        }
      }
          export function DeleteGroup(groupId) {
                    fetch('http://127.0.0.1:3000/api/groups/removeSystem?system_id=' + groupId, {
                      method: "DELETE",
                      headers: {
                        "token": localStorage.token
                      }
                    })
                    .then((resp) => resp.json())
                    .then((data) => {
                      return;
                    })
                    .catch((error) => {
                      console.log("There was an internal error fetching systems");
                      console.log(error);
                      console.log("done printing error")
                    });
                  }
