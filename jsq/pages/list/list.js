import {DBPost} from '../../db/DBPost.js';

//https://www.jianshu.com/p/df43f1983eab  倒计时

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		CX: 0,
		unit: 0,
		disabled:true,
		localEnd:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		var dbPost = new DBPost();
		//载入数据
		this.setData({
			dateList:dbPost.getAllPostData(),
			len:dbPost.getAllPostDataLen(),
			listNum:dbPost.getAllPostDataNum(),
			idx:dbPost.getAllPostDataLen() - 1,
			idxEnd:dbPost.getAllPostDataLen() - 1
		})
	},

	onReady: function() {
		//计算日期轴一小段长度
		if(this.data.len>0){
			const query = wx.createSelectorQuery()
			query.select('#block').boundingClientRect()
			query.selectViewport()
			query.exec((res) => {
				this.setData({
					unit: res[0].width / (this.data.len - 1),
					disabled:false
				})
			})
		}
		

	},
	
	onShow:function () {
		var dbPost = new DBPost();
		this.setData({
			dateList:dbPost.getAllPostData(),
			len:dbPost.getAllPostDataLen(),
			listNum:dbPost.getAllPostDataNum(),
			idx:dbPost.getAllPostDataLen() - 1,
			idxEnd:dbPost.getAllPostDataLen() - 1
		})
	},
	
	//记录移动初始位置
	changeStart: function(event) {
		let cX = event.touches[0].pageX;
		this.setData({
			CX: cX
		})
	},
	//改变日期
	changeDate: function(event) {
		let cX = event.touches[0].pageX;
		cX = cX - this.data.CX;
		cX = Math.round(cX / this.data.unit);
		cX = this.data.idxEnd - cX;
		if (cX >= 0 && cX <= (this.data.len - 1)) {
			this.setData({
				idx: cX
			})
		}
	},
	//完成动作时更新最新flag
 	changeEnd:function(event){
		this.setData({
			idxEnd:this.data.idx,
			localEnd:this.data.unit*(this.data.len - this.data.idx - 1)
		})
 	},
	//特殊情况
	changeCanel:function(event){
		this.setData({
			idxEnd:this.data.idx,
			localEnd:this.data.unit*(this.data.len - this.data.idx - 1)
		})
	},
	
	//new按钮
	jumpNew:function(){
		wx.navigateTo({
			url:'../event_queue/event_queue'
		})
	}
	
	


})
