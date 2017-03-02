'use strict';

var moment = require('moment')
var express = require('express')

const app = express()

const port = process.env.PORT || 3000;  

app.route('/')
	.get((req, res) => {
      res.sendFile(process.cwd() + '/index.html');
    });

app.get('/:query', (req, res) => {
	const query = req.params.query;
	let unix = null, dateStr = null;
	!Number.isNaN(+query) ? dateStr = convertToDateStr(query) : dateStr = moment(query, "MMMM D, YYYY").isValid() ? moment(query, "MMMM D, YYYY") : null;
	Number.isNaN(+query) && moment(query, "MMMM D, YYYY").isValid() ? unix = convertToUnix(query) : unix = +query;
	const result = {"unix": unix, "dateStr": dateStr};
	res.json(result);
})

app.listen(port, function() {
    console.log('Timestamp app listening on port ' + port);
});


function convertToUnix (dateStr) {
	return moment(dateStr, "MMMM D, YYYY").format("X");
}

function convertToDateStr(unix) {
	return moment(unix, "X").format("MMMM D, YYYY");
}