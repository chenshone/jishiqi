const app = getApp()
Page({

	data: {
    avatarUrl: '../../images/index/middle7.svg',
		nickName: "CHENSHONE"
	},

	onLoad: function(options) {
		wx.cloud.init();
		const db = wx.cloud.database()
		this.setData({
			openid: app.globalData.openid
		})
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							this.setData({
								avatarUrl: res.userInfo.avatarUrl,
								nickName: res.userInfo.nickName
							})
						}
					});
				}
			}
		});
	
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
