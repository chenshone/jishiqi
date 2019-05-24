import {
	DBPost
} from '../../db/DBPost.js';
Page({
	data: {
		ready: false,
		end: false
	},
	onLoad: function(options) {
		var dateId = options.dateId,
			itemId = options.itemId;
		this.dbPost = new DBPost(dateId, itemId);
		var itemList = this.dbPost.getListItemById();
		this.setData({
			itemDetail: itemList.item,
			year: itemList.year,
			month: itemList.month,
			day: itemList.day,
			itemId: itemId
		});
		console.log(this.data)
	},

	onShow: function() {
		//获取开始和结束的完整时间
		let date = [this.data.year, this.data.month, this.data.day];
		date = date.join("/");
		let startTime = [date, this.data.itemDetail.chooseStartTime];
		let endTime = [date, this.data.itemDetail.chooseEndTime];
		console
		startTime = startTime.join(" ");
		endTime = endTime.join(" ");
		this.setData({
			startTime: startTime,
			endTime: endTime,
			ready: false,
			end: false
		});
		this.countDownStart();
		this.countDownEnd();
	},


	onReady: function() {
		//动态渲染导航栏
		wx.setNavigationBarTitle({
			title: this.data.itemDetail.title
		});
		switch (this.data.itemDetail.level) {
			case 1:
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#ff3434'
				});
				break;
			case 2:
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#f9c85c'
				});
				break;
			case 3:
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#44cef6'
				});
				break;
			case 4:
				wx.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#00bc12'
				});
				break;
		}
	},

	// 开始倒计时
	countDownStart: function() {
		let that = this;
		let nowTime = new Date().getTime(); //现在时间（时间戳）
		let startTime = new Date(that.data.startTime).getTime(); //开始时间（时间戳）
		let time = (startTime - nowTime) / 1000; //距离开始的毫秒数
		// 获取天、时、分、秒
		let hou = parseInt(time % (60 * 60 * 24) / 3600);
		let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
		let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
		// console.log(day + "," + hou + "," + min + "," + sec)
		hou = that.timeFormin(hou),
			min = that.timeFormin(min),
			sec = that.timeFormin(sec)
		that.setData({
			startHou: that.timeFormat(hou),
			startMin: that.timeFormat(min),
			startSec: that.timeFormat(sec)
		})
		// 每1000ms刷新一次
		if (time > 0) {
			that.setData({
				countDownStart: true,
				ready: true
			})
			setTimeout(that.countDownStart, 1000);
		} else {
			that.setData({
				countDownStart: false,
				ready: false
			})
		}
	},

	// 结束倒计时
	countDownEnd: function() {
		let that = this;
		let nowTime = new Date().getTime(); //现在时间（时间戳）
		let endTime = new Date(that.data.endTime).getTime(); //结束时间（时间戳）
		let time = (endTime - nowTime) / 1000; //距离结束的毫秒数
		// 获取时、分、秒
		let hou = parseInt(time % (60 * 60 * 24) / 3600);
		let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
		let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
		// console.log(day + "," + hou + "," + min + "," + sec)
		hou = that.timeFormin(hou),
			min = that.timeFormin(min),
			sec = that.timeFormin(sec)
		that.setData({
			endHou: that.timeFormat(hou),
			endMin: that.timeFormat(min),
			endSec: that.timeFormat(sec)
		})
		// 每1000ms刷新一次
		if (time > 0) {
			that.setData({
				countDownEnd: true
			})
			setTimeout(this.countDownEnd, 1000);
		} else {
			that.setData({
				countDownEnd: false,
				end: true
			})
		}
	},
	//小于10的格式化函数（2变成02）
	timeFormat(param) {
		return param < 10 ? '0' + param : param;
	},
	//小于0的格式化函数（不会出现负数）
	timeFormin(param) {
		return param < 0 ? 0 : param;
	},

	isFinished: function() {
		if (!this.data.end) {
			wx.showToast({
				title: '计划还未结束哦',
				icon: 'none',
				mask: true
			})
		} else {
			this.setData({
				['itemDetail.finished']: true
			})
		}
	},

	finishedTxt: function(e) {
		this.setData({
			['itemDetail.finishedTxt']:e.detail.value
		});
		console.log(this.data.itemDetail)
	},
	del: function() {
		const self = this;
		wx.showModal({
			title: '提示',
			content: '确认删除',
			success(res) {
				if (res.confirm) {
					wx.showToast({
						title: '删除成功',
						icon: 'success',
						mask: true,
					});
					self.dbPost.updateDel();
					if (self.dbPost.getListItemById().itemListLen == 0) {
						wx.reLaunch({
							url: '../event_queue/event_queue'
						})
					} else {
						wx.reLaunch({
							url: '../list/list'
						})
					}
				}
			}
		})
	},
	
	ok:function(){
		const self = this;
		wx.showToast({
			title: '保存成功',
			icon: 'success',
			mask: true
		});
		self.dbPost.updateOk(self.data.itemDetail.finished,self.data.itemDetail.finishedTxt);
		wx.reLaunch({
			url:'../list/list'
		})
	}

})
