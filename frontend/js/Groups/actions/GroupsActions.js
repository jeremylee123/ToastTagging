import { SET_GROUPS_LIST_I_MANAGE, SET_GROUPS_LIST_I_AM_IN , SET_GROUPINFO, SET_GROUP_USER_INFO } from '../constants/GroupsConstants';
export function getGroups() {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/user/groupsManaged', {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_GROUPS_LIST_I_MANAGE, groups: data});
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
      fetch('http://127.0.0.1:3000/api/user/groupsPartOf', {
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
}
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
        console.log(data);
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
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/groups/addUser?group_id=' + groupId + '&username=' +  username, {
        method: "POST",
        headers: {
          "token": localStorage.token
        }
      })
    .then((data) => {
        let gG = getGroupUsers(groupId);
        gG(dispatch);
      })
      .catch((error) => {
        console.log("There was a poop");
        console.log(error);
        console.log("done printing error")
      });
    }
  }
export function AddSystemToGroup(groupId, systemId) {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/groups/addSystem?group_id=' + groupId + '&serial_id=' +  systemId, {
        method: "POST",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        let gG = getGroupInfo(groupId);
        gG(dispatch);
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
  }

  export function RemoveUserFromGroup(groupId, userId) {
      return (dispatch) => {
              fetch('http://127.0.0.1:3000/api/groups/removeUser?group_id=' + groupId + '&user_id=' +  userId, {
              method: "DELETE",
              headers: {
                "token": localStorage.token
                  }
                })
                .then((data) => {
              let gG = getGroupUsers(groupId);
              gG(dispatch);
              return;
            })
            .catch((error) => {
              console.log("There was an internal error fetching systems");
              console.log(error);
              console.log("done printing error")
            });
          };
}

export function RemoveSystemFromGroup(groupId, systemId) {
    return (dispatch) => {
          fetch('http://127.0.0.1:3000/api/groups/removeSystem?group_id=' + groupId + '&system_id=' +  systemId, {
            method: "DELETE",
            headers: {
              "token": localStorage.token
            }
          })
          .then((data) => {
            let gG = getGroupInfo(groupId);
            return gG(dispatch);

          })
          .catch((error) => {
            console.log("There was an internal error deleting");
            console.log(error);
            console.log("done printing error")
          });
        }
}

export function RemoveMyselfFromGroup(groupId) {
    return (dispatch) => {
          fetch('http://127.0.0.1:3000/api/groups/currUser?group_id=' + groupId, {
            method: "DELETE",
            headers: {
              "token": localStorage.token
            }
          })
          .then((resp) => resp.json())
          .then((data) => {
            let gG = getGroups();
            return gG(dispatch);
          })
          .catch((error) => {
            console.log("There was an internal error fetching systems");
            console.log(error);
            console.log("done printing error")
          });
        }
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
            return (dispatch) => {
                    fetch('http://127.0.0.1:3000/api/groups/remove?group_id=' + groupId, {
                      method: "DELETE",
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
