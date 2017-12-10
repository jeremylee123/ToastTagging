import { SET_SYSTEM_INFO, SET_TAGS_LIST } from '../constants/SystemInfoConstants';
export function getSystemInfo(serialNumber) {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/systems?serialNumber='+ serialNumber, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_SYSTEM_INFO, systemInfo: data[0]});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching system info");
        console.log(error);
        console.log("done printing error")
      });
    }
}

export function getTagsList(serialNumber) {
    return (dispatch) => {
      fetch('http://127.0.0.1:3000/api/tags?serial_id='+ serialNumber, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_TAGS_LIST, tags: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}