//index.js
//获取应用实例
var util = require('../../utils/util.js');
Page({
	onLoad: function(options) {
		let time = util.formatTime(new Date());
		let date = util.getDates(time);
		console.log(date);
		let dateArr = [];
		dateArr = date[0].time.split("-").map(Number)
		console.log(dateArr)
		this.setData({
			year:dateArr[0],
			month:dateArr[1],
			day:dateArr[2],
			week:date[0].week
		})
	}
})