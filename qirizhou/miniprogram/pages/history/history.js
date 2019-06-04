const app = getApp()
Page({

	data: {
	},

	onLoad: function(options) {
		wx.cloud.init();
		const db = wx.cloud.database()
		this.setData({
			openid: app.globalData.openid,
      avatarUrl: app.globalData.avatarUrl,
      nickName: app.globalData.nickName,
		})
	
		// 查询当前用户所有的dateList
		db.collection('dateList').where({
			_openid: this.data.openid
		}).get({
			success: res => {
				this.setData({
					list: res.data.reverse()
				})
			}
		})

	},

	goBack: function() {
		wx.navigateTo({
			url: '../list/list'
		})
	}
})
