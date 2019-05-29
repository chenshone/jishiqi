// pages/w/w.js
const app = getApp()
Page({
	onLoad: function(options) {
		var isFirst = wx.getStorageSync('dateList');
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					//调用云函数,获取openId
					wx.cloud.init();
					wx.cloud.callFunction({
						name: 'login',
						data: {},
						success: res => {
							app.globalData.openid = res.result.openid;
							app.globalData.avatarUrl = res.result.avatarUrl
						}
					});
					if (isFirst.length > 0) {
						wx.reLaunch({
							url: '/pages/list/list'
						})
					} else {
						wx.reLaunch({
							url: '/pages/new/new'
						})
					}
				} else {
					wx.reLaunch({
						url: '/pages/index/index'
					})
				}
			},
		});
	}
})
