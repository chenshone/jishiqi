import {DBPost} from '../../db/DBPost.js';

Page({

	data: {
		CX: 0,
		unit: 0,
		disabled:true
	},

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
			idxEnd:this.data.idx
		})
 	},
	//特殊情况
	changeCanel:function(event){
		this.setData({
			idxEnd:this.data.idx
		})
	},
	
	//new按钮
	jumpNew:function(){
		wx.navigateTo({
			url:'../new/new'
		})
	},
	
	//进入详情页
	onTapToDetail:function(event){
		let dateId = event.currentTarget.dataset.dateId;
		let itemId = event.currentTarget.dataset.itemId;
		wx.navigateTo({
			url:'../detail/detail?dateId='+dateId+'&itemId='+itemId,
		})
	},
	
	//进入历史记录页
	history:function(){
		wx.navigateTo({
			url:'../history/history'
		})
	}
	
	


})
