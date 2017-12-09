const bcrypt = require('bcrypt');

var hash = bcrypt.hashSync("PASSWORD", 10);
console.log(hash);
