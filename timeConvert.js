import moment from 'moment'

export function convertToUnix = (dateStr) => {
	return moment(dateStr);
}

export function convertToDateStr = (unix) => {
	return moment(unix).format("MMDDYYYY");
}
