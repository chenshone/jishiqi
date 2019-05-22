//index.js
//获取应用实例
import {DBPost} from '../../db/DBPost.js';
var util = require('../../utils/util.js');
Page({
	data:{
		isTouch1:false,
		isTouch2:false,
		isTouch3:false,
		isTouch4:false,
		isChoose:false,
		isFinshed:false,
		things:{
			title:"",
			content:"",
			level:0
		}
	},
	
	onLoad: function(options) {
		const things = this.data.things;
		let time = util.formatTime(new Date());  //获取年份日期时间
		let nowTime = time.substr(-8,5);//获取时间 hh:mm
		//将结束时间加1min
		let endTimeStartArr = nowTime.split("");
		endTimeStartArr[endTimeStartArr.length-1] =(parseInt(endTimeStartArr[endTimeStartArr.length-1]) + 1).toString();
		let endTimeStart = endTimeStartArr.join("");
		let date = util.getDates(time);  //过去年份日期星期
		let dateArr = [];
		dateArr = date[0].time.split("-"); //分割字符串
		this.setData({
			['things.startTime']:nowTime,
			['things.chooseStartTime']:nowTime,
			['things.chooseEndTime']:endTimeStart,
			endTimeStart:endTimeStart,
			year:dateArr[0],
			month:dateArr[1],
			day:dateArr[2],
			week:date[0].week
		});
	},
	
	//重要程度选择
	isTouch1:function(){
		const things = this.data.things;
		if(this.data.isTouch1){
			this.setData({
				isTouch1:false,
				['things.level']:0
			})
		}else{
			this.setData({
				isTouch1:true,
				isTouch2:false,
				isTouch3:false,
				isTouch4:false,
				['things.level']:1
			})
			
		}
	},
	isTouch2:function(){
		const things = this.data.things;
		if(this.data.isTouch2){
			this.setData({
				isTouch2:false,
				['things.level']:0
			})
		}else{
			this.setData({
				isTouch2:true,
				isTouch1:false,
				isTouch3:false,
				isTouch4:false,
				['things.level']:2
			})
		}
	},
	isTouch3:function(){
		const things = this.data.things;
		if(this.data.isTouch3){
			this.setData({
				isTouch3:false,
				['things.level']:0
			})
		}else{
			this.setData({
				isTouch3:true,
				isTouch1:false,
				isTouch2:false,
				isTouch4:false,
				['things.level']:3
			})
		}
	},
	isTouch4:function(){
		const things = this.data.things;
		if(this.data.isTouch4){
			this.setData({
				isTouch4:false,
				['things.level']:0
			})
		}else{
			this.setData({
				isTouch4:true,
				isTouch1:false,
				isTouch2:false,
				isTouch3:false,
				['things.level']:4
			})
		}
	},
	
	//选择开始时间
	bindStartTime:function(e){
		const things = this.data.things;
		//将结束时间同步加1min
		let endTimeStartArr = e.detail.value.split("");
		endTimeStartArr[endTimeStartArr.length-1] =(parseInt(endTimeStartArr[endTimeStartArr.length-1]) + 1).toString();
		let endTimeStart = endTimeStartArr.join("");
		this.setData({
			['things.chooseStartTime']:e.detail.value,
			['things.chooseEndTime']:endTimeStart,
			endTimeStart:endTimeStart,
			isChoose:true
		})
	},
	//选择结束时间
	bindEndTime:function(e){
		const things = this.data.things;
		this.setData({
			['things.chooseEndTime']:e.detail.value,
			isChoose:true
		})
	},
	
	//获取标题
	thingTitle:function(e){
		const things = this.data.things;
		this.setData({
			['things.title']:e.detail.value
		})
	},
	//获取内容
	thingContent:function(e){
		const things = this.data.things;
		this.setData({
			['things.content']:e.detail.value
		})
	},
	
	//完成按钮
	onTapJump:function(){
		var dbPost = new DBPost();
		const things = this.data.things;
		//信息是否填写完全
		if(things.title == "" || things.content == "" || things.level == 0){
			wx.showToast({
				title:'信息未填写完全哦',
				icon:'none',
				mask:true
			})
		} else {
			this.setData({
				isFinshed:true
			});
			dbPost.updateDateList(this.data);
		}
	 }
	
})