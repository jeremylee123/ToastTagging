import request from 'sync-request';
var auth = {
  /**
   * Checks if anybody is logged in
   * @return {boolean} True if there is a logged in user, false if there isn't
   */
  loggedIn() {
    return !!localStorage.token;
  },
  /**
     * Logs a user in
     * @param  {string}   username The username of the user
     * @param  {string}   password The password of the user
     * @param  {Function} callback Called after a user was logged in on the remote server
     */
    login(username, password, callback) {
      // If there is a token in the localStorage, the user already is
      // authenticated
      // if (this.loggedIn()) {
      //   callback(true);
      //   return;
      // }
      //Sends credentials to backend
      let response = request('POST', 'http://127.0.0.1:3000/api/login', {
        json: {username: username, password: password}
      });
      // If the user was authenticated successfully, save a random token to the
      console.log(response);
      if (response.statusCode == "200") {
        const token = JSON.parse(response.body).token;
        localStorage.token = token;
        callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        callback(false, response.error);
      }
    }
}

module.exports = auth;
