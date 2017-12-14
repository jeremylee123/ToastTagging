import { SET_SYSTEMS_LIST } from '../constants/SystemsListConstants';
import { connect } from 'react-redux';
export function getSystemsList(page = 1) {
    return (dispatch) => {
      if(page < 1) {
        return;
      }
      console.log(localStorage.token);
      fetch('http://127.0.0.1:3000/api/listsystems?offset=10&start=' + page, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch({type: SET_SYSTEMS_LIST, newData: {
            list: data,
            page: page
          }
        });
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
  if(term == '') {
    return getSystemsList();
  }
    return (dispatch) => {
      console.log(localStorage.token);
      fetch('http://127.0.0.1:3000/api/tags/search?searchString=' + term, {
        method: "GET",
        headers: {
          "token": localStorage.token
        }
      })
      .then((resp) => resp.json())
      .then((data) => {
        console.log("search results");
        console.log(data);
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
