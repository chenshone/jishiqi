//index.js
//获取应用实例
var util = require('../../utils/util.js');
Page({
	data:{
		isTouch1:false,
		isTouch2:false,
		isTouch3:false,
		isTouch4:false
	},
	
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
	},
	
	isTouch1:function(){
		if(this.data.isTouch1){
			this.setData({
				isTouch1:false
			})
		}else{
			this.setData({
				isTouch1:true,
				isTouch2:false,
				isTouch3:false,
				isTouch4:false
			})
			
		}
	},
	isTouch2:function(){
		if(this.data.isTouch2){
			this.setData({
				isTouch2:false
			})
		}else{
			this.setData({
				isTouch2:true,
				isTouch1:false,
				isTouch3:false,
				isTouch4:false
			})
		}
	},
	isTouch3:function(){
		if(this.data.isTouch3){
			this.setData({
				isTouch3:false
			})
		}else{
			this.setData({
				isTouch3:true,
				isTouch1:false,
				isTouch2:false,
				isTouch4:false
			})
		}
	},
	isTouch4:function(){
		if(this.data.isTouch4){
			this.setData({
				isTouch4:false
			})
		}else{
			this.setData({
				isTouch4:true,
				isTouch1:false,
				isTouch2:false,
				isTouch3:false
			})
		}
	}
})