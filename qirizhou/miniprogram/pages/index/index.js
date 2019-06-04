// pages/w/w.js
const app = getApp()

Page({
	data: {
    avatarUrl: '../../images/index/middle7.svg',
		logged: false,
		takeSession: false,
		requestResult: ''
	},

	//获取用户信息
	onGetUserInfoOrGoin: function(e) {
    const self = this;
		if (!this.logged && e.detail.userInfo) {
			this.setData({
				logged: true,
				avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
			})
			//调用云函数,获取openId
			wx.cloud.init()
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					app.globalData.openid = res.result.openid;
          app.globalData.avatarUrl = self.data.avatarUrl;
          app.globalData.nickName = self.data.nickName;
				}
			})
		}
    //登录后进入主程序
    if (this.data.logged) {
      var isFirst = wx.getStorageSync('dateList');
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
      wx.showToast({
        title: '您尚未登录，请先登录',
        icon: 'none',
        mask: true
      });
    }
	}
})
