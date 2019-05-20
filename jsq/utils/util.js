const formatTime = date => {
	const year = date.getFullYear()
	const month = date.getMonth() + 1
	const day = date.getDate()
	const hour = date.getHours()
	const minute = date.getMinutes()
	const second = date.getSeconds()

	return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
	n = n.toString()
	return n[1] ? n : '0' + n
}

//todate默认参数是当前日期，可以传入对应时间

function getDates(todate) {
	var dateArry = [];
	var dateObject = dateLater(todate);
	dateArry.push(dateObject);
	return dateArry;
}

function dateLater(dates) {
	let dateObj = {};
	let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
	let date = new Date(dates);
	date.setDate(date.getDate());
	let day = date.getDay();
	let yearDate = date.getFullYear();
	let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
	let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
	dateObj.time = yearDate + '-' + month + '-' + dayFormate;
	dateObj.week = show_day[day];
	return dateObj;
}

module.exports = {
	formatTime: formatTime,
	getDates:getDates
}
