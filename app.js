'use strict';

import {convertToUnix, convertToDateStr} from './timeConvert.js'

import express from 'express'

const app = express()

const port = process.env.PORT || 3000;  

app.route('/')
	.get((req, res) => {
      res.sendFile(process.cwd() + './index.html');
    });

app.get('/:query', (req, res) => {
	const query = this.props.params.query;
	let unix = null, dateStr = null;
	!Number.isNaN(+query) ? dateStr = convertToDateStr(query) : dateStr = moment(query, "MMMM D, YYYY").isValid() ? moment(query, "MMMM D, YYYY") : null;
	Number.isNaN(+query) && moment(query, "MMMM D, YYYY").isValid() ? unix = convertToUnix(query) : unix = +query;
	const result = {"unix": unix, "dateStr": dateStr};
	return JSON.stringify(result);
})

app.listen(port, function() {
    console.log('Timestamp app listening on port ' + port);
});