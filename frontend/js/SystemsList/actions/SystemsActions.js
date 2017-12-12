import { SET_SYSTEMS_LIST } from '../constants/SystemsListConstants';
import { connect } from 'react-redux';
export function getSystemsList() {
    return (dispatch) => {
      console.log(localStorage.token);
      fetch('http://127.0.0.1:3000/api/listsystems', {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_SYSTEMS_LIST, systemsList: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}

export function search(term, searchOffset) {
    return (dispatch) => {
      console.log(localStorage.token);
      fetch('http://127.0.0.1:3000/api/tags/search?searchString=' + term + '&limit=10&offset=' + searchOffset, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_SYSTEMS_LIST, systemsList: data});
        return;
      })
      .catch((error) => {
        console.log("There was an internal error fetching systems");
        console.log(error);
        console.log("done printing error")
      });
    }
}
