import {DBPost} from '../../db/DBPost.js';

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
		this.setData({
			dateList:dbPost.getAllPostData(),
			len:dbPost.getAllPostDataLen(),
			listNum:dbPost.getAllPostDataNum(),
			idx:dbPost.getAllPostDataLen() - 1,
			idxEnd:dbPost.getAllPostDataLen() - 1
		})
	},

	onReady: function() {
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

	changeStart: function(event) {
		let cX = event.touches[0].pageX;
		this.setData({
			CX: cX
		})
	},

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
 	changeEnd:function(event){
		this.setData({
			idxEnd:this.data.idx,
			localEnd:this.data.unit*(this.data.len - this.data.idx - 1)
		})
 	},
	
	changeCanel:function(event){
		this.setData({
			idxEnd:this.data.idx,
			localEnd:this.data.unit*(this.data.len - this.data.idx - 1)
		})
	}
	
	


})
