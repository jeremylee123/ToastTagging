const mysql = require('mysql');
const bodyParser = require('body-parser');
const headerParser = require('header-parser');
const jwt = require('jsonwebtoken');
const config = require('./files/config');
const validateJWT = require('express-jwt');
const bcrypt = require('bcrypt');

var connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'root',
  database : 'toasttagging',
  multipleStatements : true
});
const express = require('express');
const app = express();

// Use static resources in public folder (HTML, CSS, JS)
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(headerParser);

app.options("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, token');
  res.sendStatus(200);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use("/api/", validateJWT({
  secret: config.secret,
  getToken: function getTokenFromHeader(req) {
    console.log(req.headers);
    return req.get('token');
  }}).unless({
    path: [
      '/api/login'
    ]
  }));
//Endpoint for authenticating user. Sends back jwt token if credentials exist
app.post('/api/login', function (req, res) {
  // Get the id, username, password from the username based off of the provided username
  connection.query("SELECT user_id, username, password, admin FROM user WHERE username="
    + "\"" + req.body.username + "\"", function(error, results, fields) {
    if(error) {
      console.log("Error retrieving userid based off of credentials");
      console.log(error);
      res.status(500).send("Error authenticating credentials");
      return;
    } else if(!results || results[0] == undefined) {
      res.status(401).send("The provided credentials are incorrect");
      return;
    }
    //Compare the hashed password sent from the frontend to the hashed password from the db
    bcrypt.compare(req.body.password, results[0].password, function(error, bcryptResult) {
      if(error) {
        console.log("Could not hash password");
        console.log(error);
        res.status(500).send("Error authenticating credentials");
        return;
      } else if(bcryptResult == true) {
        res.send({token: jwt.sign({
          userid: results[0].user_id,
          admin: results[0].admin === 1
        }, config.secret)});
      } else {
        console.log("Could not match " + req.body.password + " with " + results[0].password);
        res.status(401).send("The provided credentials are incorrect");
      }
    });
  });
});

/**
 * Type: GET
 * Directory: localhost:3000/api/listsystems
 * Parameters: listsystems - displays all of the system rows.
 *         listsystems?offset=x - displays the first x rows.
 *         listsystems?offset=x&start=y - displays the first x rows starting at entry y.
 * The usage of the offset and start parameters can be useful if we want to have
 * pages that display certain amounts of rows per page. eg. display 10 systems
 * per page and easily navigate through different pages to calculate the offsets and starting entries.
 */
app.get('/api/listsystems', function (req, res) {
  var queryText = "SELECT * FROM system";
  if (req.query.offset != null && req.query.start == null)
    queryText += " LIMIT " + req.query.offset;
  else if (req.query.offset != null && req.query.start != null)
    queryText += " LIMIT " + (req.query.start - 1) + ", " + req.query.offset;
	else
		queryText += " LIMIT 100;";
  connection.query(queryText, function(error, results, fields) {
    if(error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

/**
 * Type: GET
 * Directory: localhost:3000/api/groups
 * Parameters: groups?group_id=x - displays all the systems associated with group id x.
 * This endpoint displays all of the system that are
 * associated with the provided system group id that
 * corresponds in the systemgroups junction table.
 */
app.get('/api/groups/', function (req, res) {
	if (req.query.group_id != null) {
		connection.query("SELECT * FROM system WHERE serialNumber IN (SELECT system_id FROM systemgroups WHERE systemgroup_id = " + req.query.group_id + ");", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
    }
});

/**
 * Type: PUT
 * Directory: localhost:3000/api/tags
 * Parameters: tags?tag_id=x&... - Modifies the following value(...) for the given tag_id x.
                  name, user_id, visibility can be used individually or
                  in a combined sense (eg. name=x&visibility=y)
 * This endpoint modifies a mix and match of
 * the name, user_id, and visibility fields for
 * the tag associated with the tag_id.
 */
app.put('/api/tags', function (req, res) {
	var user_id = req.user.userid;
	if (req.query.tag_id != null) {
		var queryText = "UPDATE tag SET ";
		if (req.query.name != null) {
			if (req.query.user_id != null || req.query.visibility != null) {
				queryText += "name = '" + req.query.name + "', ";
			} else {
				queryText += "name = '" + req.query.name + "' ";
			}
		}
		if (req.query.user_id != null) {
			if (req.query.visibility != null) {
				queryText += "user_id = " + req.query.user_id + ", ";
			} else {
				queryText += "user_id = " + req.query.user_id + " ";
			}
		}
		if (req.query.visibility!= null) {
			queryText += "visibility = " + req.query.visibility + " ";
		}
		console.log(queryText);
		queryText += "WHERE id = " + req.query.tag_id +
		" AND (visibility = 0 " +
		"OR (visibility = 1 AND id IN (SELECT tag_id FROM systemtags WHERE system_id IN (SELECT system_id FROM systemgroups WHERE systemgroup_id IN (SELECT systemgroup_id FROM systemgroupusers WHERE user_id = " + user_id + ")))) " +
		"OR (visibility = 2 AND user_id = " + user_id + "));";
		connection.query(queryText, function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
	}
});

/**
 * Type: GET
 * Directory: localhost:3000/api/tags
 * Parameters: tags?serial_id=x - displays the tags associated to the systems with an id of x.
         tags?tag_id=x   - displays the systems associated with the tag with an id of x.
         tags?group_id=x   - displays the tags associated to the systems in system group x.
 * Given a provided serial_id representing the id of a system, we are
 * returning all of the tag data that is associated with the system id.
 * This utilizes the junction table systemtags that has the relationships
 * of the system_id:tag_id. Providing a tag_id instead of a serial_id does
 * the opposite of this process.
 */
app.get('/api/tags', function (req, res) {
	var user_id = req.user.userid;
	if (req.query.serial_id != null) {
		connection.query("SELECT * FROM tag WHERE id IN (SELECT tag_id FROM systemtags WHERE system_id = " + req.query.serial_id + ") " +
		"AND (visibility = 0 " +
		"OR (visibility = 1 AND id IN (SELECT tag_id FROM systemtags WHERE system_id IN (SELECT system_id FROM systemgroups WHERE systemgroup_id IN (SELECT systemgroup_id FROM systemgroupusers WHERE user_id = " + user_id + ")))) " +
		"OR (visibility = 2 AND user_id = " + user_id + "));", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
	} else if (req.query.tag_id != null) {
		connection.query("SELECT * FROM system WHERE serialNumber IN (SELECT system_id FROM systemtags WHERE tag_id = " + req.query.tag_id + ");", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
	} else if (req.query.group_id != null) {
		connection.query("SELECT * FROM tag WHERE id IN (SELECT tag_id FROM systemtags where system_id IN (SELECT system_id FROM systemgroups WHERE systemgroup_id =" + req.query.group_id + "));", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
  }
});

/**
 * Type: POST
 * Directory: localhost:3000/api/tags
 * Parameters: tags?serial_id=w&name=x&visibility=y - Adds a tag entry to the tag table with name x, and visibility y.
													This tag is then added to system w.
 * This adds a new tag entry to the tag table of our database. The id is a primary key
 * and will automatically increment every new entry, meaning that the id's will stay unique.
 * All three parameters are required since we don't want nulled data, web page will respond if
 * the syntax is incorrect. This also adds the tag to the junction table corresponding to the system id.
 */
app.post('/api/tags', function (req, res) {
  var serial_id = req.query.serial_id;
  var name = req.query.name;
  var user_id = req.user.userid;
  var visibility = req.query.visibility;
  if (name != null && user_id != null && visibility != null && serial_id != null) {
    connection.query("INSERT INTO tag (name, user_id, visibility) VALUES ('" + name + "', " + user_id + ", " + visibility + ");", function(error, results, fields) {
      if (error) {
        res.send(error);
        return;
      } else {
        connection.query("INSERT INTO systemtags (system_id, tag_id) VALUES ('" + serial_id + "', (SELECT id FROM tag ORDER BY ID DESC LIMIT 1));", function(error, results, fields) {
          if (error) {
            res.send(error);
          } else {
            res.send(results);
          }
        });
      }
    });
  }
});

/**
 * Type: POST
 * Directory: localhost:3000/api/groups
 * Parameters: groups?groupName=x&user_id=y - Creates a group with the name x created by the user y.
 * This endpoint creates a new system group entry
 * in the systemgroup table with the specified
 * name and manager.
 */

 //NEED QUERY THAT CHECKS if group name is unique before creating it
 // Then need to insert the relationship
app.post('/api/groups', function (req, res) {
	var groupName = req.query.groupName;
	var user_id = req.user.userid;
	if (groupName != null && user_id != null){
    //Check if given groupName is unique
    connection.query(`SELECT * FROM systemgroup WHERE name = "{groupName}";`, function(error, results, fields){
      if(error) {
        res.send(error);
      }
      else{
        if(results.length > 0){
          res.sendStatus(400, "A group with that name already exists.");
        }
      }
    });
		connection.query("INSERT INTO systemgroup (name, manager) VALUES ('" + groupName + "','" + user_id + "');", function(error, results, fields){
			if (error) {
        console.log(error);
				res.sendStatus(500);
        return;
			} else {
        // prev query: "INSERT INTO systemgroupusers (systemgroup_id, user_id) VALUES ('" + groupName + "','" + user_id + "');"
        connection.query(`INSERT INTO systemgroupusers (systemgroup_id, user_id) VALUES ((SELECT id FROM systemgroup WHERE name="` + groupName + `"),` + user_id + `);`, function(error, results, fields){
          if (error) {
            console.log(error);
            res.sendStatus(500);
          } else {
            res.send(results);
          }
        });
			}
		});
	}
});


/**
 * Type: DELETE
 * Directory: localhost:3000/api/groups
 * Parameters: tags?serial_id=x&tag_id=y - Removes tag y from system x.
 * This removes the specified tag from the specified
 * system. This still requires permissions back end
 * although security is being handled via the frontend
 * end right now. This does not delete the tag, only
 * the system:tag relationship in systemtags.
 */

app.delete('/api/tags', function (req, res) {
  var user_id = req.user.userid;
  if (req.query.serial_id != null && req.query.tag_id != null) {
    connection.query("DELETE FROM systemtags WHERE system_id = '" + req.query.serial_id + "' AND tag_id = '" + req.query.tag_id + "';", function(error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
  }
});

/**
 * Type: DELETE
 * Directory: localhost:3000/api/tags
 * Parameters: groups/group_id=x - Removes the system group with the id of x.
 * This removes the system group with the provided id. Not only
 * does this remove the entry from the systemgroup table, but
 * also the systemgroup:system relationship for all of the entries
 * in the junction table systemgroups that correspond to the provided
 * system group id.
 */
app.delete('/api/tags', function (req, res) {
  var user_id = req.user.userid;
  if (req.query.group_id != null) {
    connection.query("DELETE FROM systemgroup WHERE id = " + req.query.group_id + " AND manager = " + user_id + ";" +
    " DELETE FROM systemgroups WHERE systemgroup_id = " + req.query.group_id + " AND systemgroup_id IN (SELECT id FROM systemgroup WHERE manager = " + user_id + ");", [1,2], function(error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
  }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/systems
 * Parameters: systems/serial_id=x - Retrieves system data for the provided system with a serial
                  number at x.
 * The usage of this endpoint is to grab all relevant system
 * data that is relevant to the system with a serial number
 * that matches the provided serial_id.
 */
app.get('/api/systems', function (req, res) {
  if (req.query.serial_id != null) {
    connection.query("SELECT * FROM system WHERE serialNumber = "+ req.query.serial_id, function(error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
  }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/groups/users
 * Parameters: groups/users/group_id=x - Retrieves all users of the system group with the id of x.
 * The following endpoint grabs the information corresponding to
 * all of the users associated in the system group provided.
 */
app.get('/api/groups/users', function (req, res) {
  var group_id = req.query.group_id;
  if (group_id != null) {
        connection.query("SELECT * FROM user WHERE user_id IN (SELECT user_id FROM systemgroupusers WHERE systemgroup_id = " + group_id + ");", function (error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
        });
    }
});

/**
 * Type: PUT
 * Directory: localhost:3000/api/groups
 * Parameters: groups?group_id=x&name=y
 * This renames a group with the id of x to the name of y.
 * This can only be completed if the user_id cookie matches
 * the manager ID of the group.
 */
app.put('/api/groups', function (req, res) {
  var user_id = req.user.userid;
  if (req.query.group_id != null && req.query.name != null) {
    connection.query("UPDATE systemgroup SET name = '" + req.query.name + "' WHERE id = " + req.query.group_id + " AND manager = " + user_id + ";", function(error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
  }
});

/**
* Type: GET
* URI: /api/tags/search
* Parameters: String searchString - alphanumeric string
*             int resultLimit - number of results returned from search
*             int resultOffset - starting index of result list to return from
* Response: Returns a list of search results consisting of systems whose tag names contain searchString as a substring
*/

app.get('/api/tags/search', function (req, res) {
  var searchedString = req.query.searchString;
  var resultLimit = req.query.offset;
  var resultOffset = req.query.start;
  // invalidSearchPattern is a regex that checks for one or more non-alphanumeric characters
  var nonAlphaNum = /[^a-zA-Z\d]+/;
  if (searchedString && !searchedString.match(nonAlphaNum)) {
  //trim white space from beginning and end of search
  searchedString.trim();
  if(resultLimit){
    resultLimit = "LIMIT " + resultLimit;
  }
  else{
    resultLimit = "";
  }
  if(resultOffset){
    resultOffset = "OFFSET " + resultOffset;
  }
  else{
    resultOffset = "";
  }
  searchQuery = "SELECT * FROM system WHERE serialNumber IN "
           + "(SELECT system_id FROM systemtags WHERE tag_id IN "
            + "(SELECT id from tag WHERE "
            + "name LIKE CONCAT('%', \"" + searchedString + "\" ,'%')"
            + ")"
            + ") " + resultLimit + " " + resultOffset + ";";
  connection.query(searchQuery, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
  }
  else{
    res.send("Invalid search, please enter a valid string - alphanumeric");
      }
});

/**
 * Type: POST
 * Directory: localhost:3000/api/groups
 * Parameters: groups/addSystem?group_id=x&serial_id=y - Adds a system identified by y to the system group x.
 * This adds a system to a group from a systems serial number. Its's serial number is how we add
 * the system into the group beacause it is a unique identifier
 */
app.post('/api/groups/addSystem/', function (req, res) {
    var group_id = req.query.group_id;
    var serial_id = req.query.serial_id;
    if (group_id != null && serial_id != null) {
        connection.query("INSERT INTO systemgroups (systemgroup_id, system_id) VALUES ('" + group_id + "','" + serial_id + "');", function(error, results, fields) {
      if (error) {
        res.send(error);
      } else {
        res.send(results);
      }
    });
    }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/user/groups
 * Parameters: user/groups - Retrieves all the system groups associated with user x.
 * The usage of this endpoint is to return system groups as well as important
 * information regarding users and system groups.
 */
app.get('/api/user/groups', function (req, res) {
	var user_id = req.user.userid;
	if (user_id != null) {
		connection.query("SELECT * FROM systemgroup WHERE id IN (SELECT systemgroup_id FROM systemgroupusers WHERE user_id = " + user_id + ");", function (error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
        });
    }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/groups
 * Parameters: groups - displays all groups the user is part of
			   groups?group_id=x - displays all the systems associated with group id x.
 * This endpoint displays all of the system that are
 * associated with the provided system group id that
 * corresponds in the systemgroups junction table.
 */
app.get('/api/groups', function (req, res) {
	var user_id = req.user.userid;
	if (req.query.group_id != null) {
		connection.query("SELECT * FROM system WHERE serialNumber IN (SELECT system_id FROM systemgroups WHERE systemgroup_id = " + req.query.group_id + ");", function(error, results, fields) {
		  if (error) {
			res.send(error);
		  } else {
			res.send(results);
		  }
		});
    } else if (user_id != null) {
		connection.query("SELECT * FROM systemgroup WHERE id IN (SELECT systemgroup_id FROM systemgroupusers WHERE user_id = " + user_id + ");", function (error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
        });
    }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/user/groupsManaged
 * Parameters: user/groupsManaged - Retrieves all system groups that the current user is a manager of.
 * The usage of this endpoint is to return all of the system groups
 * that the current user session is a manager of.
 */
app.get('/api/user/groupsManaged', function (req, res) {
	var user_id = req.user.userid;
	if (user_id != null) {
		connection.query("SELECT * FROM systemgroup WHERE manager = " + user_id + ";", function (error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
        });
    }
});

/**
 * Type: GET
 * Directory: localhost:3000/api/user/groupsPartOf
 * Parameters: user/groupsPartOf - Retrieves all system groups that the current user is part of but not a manager of.
 * The usage of this endpoint is to return all of the system groups
 * that the current user session is a member of but not a manager of.
 */
app.get('/api/user/groupsPartOf', function (req, res) {
	var user_id = req.user.userid;
	if (user_id != null) {
		connection.query("SELECT * FROM systemgroup WHERE id IN (SELECT systemgroup_id FROM systemgroupusers WHERE user_id = " + user_id + ") AND manager != " + user_id + ";", function (error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
        });
    }
});

/**
 * Type: POST
 * Directory: /api/groups/addUser
 * Parameters: groups/addUser?group_id=x&username=y - Adds the user with username y to group x.
 * This adds the specified user to the
 * specified system group.
 */
app.post('/api/groups/addUser', function (req, res) {
    var group = req.query.group_id;
	var username = req.query.username;
    if (group != null && username != null) {
        connection.query("INSERT INTO systemgroupusers (systemgroup_id, user_id) VALUES ('" + group + "',(SELECT user_id FROM user WHERE username = '" + username + "'));", function(error, results, fields) {
			if (error) {
				res.sendStatus(400);
			} else {
				res.sendStatus(200);
			}
		});
    }
});

/**
 * Type: DELETE
 * Directory: /api/groups/removeUser
 * Parameters: groups/removeUser?group_id=x - Removes the current user from group x.
 * This removes the current user session from the
 * system group provided.
 */
app.delete('/api/groups/currUser', function (req, res) {
    var group = req.query.group_id;
    var user = req.user.userid;
    if (group != null && user != null) {
        connection.query("DELETE FROM systemgroupusers WHERE systemgroup_id = \"" + group + "\" AND user_id = \"" + user + "\";", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
    }
});

/**
 * Type: DELETE
 * Directory: /api/groups/removeUser
 * Parameters: groups/removeUser?group_id=x& - Removes the current user from group x.
 * This removes the current user session from the
 * system group provided.
 */
app.delete('/api/groups/removeUser', function (req, res) {
    var group = req.query.group_id;
    var user = req.query.user_id;
    if (group != null && user != null) {
        connection.query("DELETE FROM systemgroupusers WHERE systemgroup_id = \"" + group + "\" AND user_id = \"" + user + "\";", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
    }
});

/**
 * Type: DELETE
 * Directory: /api/groups/removeSystem
 * Parameters: /api/groups/removeSystem?system_id=
 */
app.delete('/api/groups/removeSystem', function (req, res) {
    var group = req.query.group_id;
    var system = req.query.system_id;
    if (group != null && system != null) {
        connection.query("DELETE FROM systemgroups WHERE systemgroup_id = \"" + group + ";", function(error, results, fields) {
			if (error) {
				res.send(error);
			} else {
				res.send(results);
			}
		});
    }
});

app.get('/api/tags/search', function (req, res) {
  var searchedString = req.query.searchString;
  var resultLimit = req.query.limit;
  var resultOffset = req.query.offset;
  // invalidSearchPattern is a regex that checks for one or more non-alphanumeric characters
  var nonAlphaNum = /[^a-zA-Z\d]+/;
  if (searchedString && !searchedString.match(nonAlphaNum)) {
  //trim white space from beginning and end of search
  searchedString.trim();
  if(resultLimit){
    resultLimit = "LIMIT " + resultLimit;
  }
  else{
    resultLimit = "";
  }
  if(resultOffset){
    resultOffset = "OFFSET " + resultOffset;
  }
  else{
    resultOffset = "";
  }
  searchQuery = "SELECT * FROM system WHERE serialNumber IN "
           + "(SELECT system_id FROM systemtags WHERE tag_id IN "
            + "(SELECT id from tag WHERE "
            + "name LIKE CONCAT('%', \"" + searchedString + "\" ,'%')"
            + ")"
            + ") " + resultLimit + " " + resultOffset + ";";
  connection.query(searchQuery, function (error, results, fields) {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
  }
  else{
    res.send("Invalid search, please enter a valid string - alphanumeric");
      }
});

app.listen(3000, () => console.log('http://localhost:3000/'))
