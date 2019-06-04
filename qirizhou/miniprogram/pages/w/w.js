// pages/w/w.js
const app = getApp()
Page({
	onLoad: function(options) {
    const self = this;
		var isFirst = wx.getStorageSync('dateList');
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              self.setData({
                avatarUrl: res.userInfo.avatarUrl,
                nickName: res.userInfo.nickName
              })
            }
          });
					//调用云函数,获取openId
					wx.cloud.init();
					wx.cloud.callFunction({
						name: 'login',
						data: {},
						success: res => {
							app.globalData.openid = res.result.openid;
              app.globalData.avatarUrl = self.data.avatarUrl;
              app.globalData.nickName = self.data.nickName;
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
