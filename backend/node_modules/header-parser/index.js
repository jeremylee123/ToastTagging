var querystring = require('querystring');

module.exports = function (req, res, next) {
	req.headerParsed = function (header) {
		header = header.toLowerCase();
		var encoded = req.get(header);
		var decoded = querystring.decode(encoded);

		return decoded;
	};
	req.getParsed = req.headerParsed;

	next();
};
