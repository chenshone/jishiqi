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


//获取某年某月某天是第几周
//注:第一天为周日
function weekNum(y, m, d) {
	var targetDay = new Date(y, m - 1, d); 
	var year = targetDay.getFullYear();
	var month = targetDay.getMonth();
	var days = targetDay.getDate();
	//这一天是该年的第多少天
	for (var i = 1; i < m; i++) {
		days += getMonthDays(year, i);
	}
	//该年第一天是星期几
	var yearFirstDay = new Date(year, 0, 1).getDay();
	//计算是第几周
	days += yearFirstDay;
	var week = Math.ceil(days / 7);
	return week;
}
//判断年份是否为润年
function isLeapYear(year) {
	return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}

//获取某年某月的天数
function getMonthDays(year, month) {
	return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
}

module.exports = {
	formatTime: formatTime,
	getDates: getDates,
	weekNum: weekNum
}
