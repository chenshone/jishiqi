// pages/w/w.js
const app = getApp()

Page({
	data: {
		avatarUrl: '../../images/index/user-unlogin.png',
		userInfo: {},
		logged: false,
		takeSession: false,
		requestResult: ''
	},

	onLoad: function() {
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							this.setData({
								logged: true,
								avatarUrl: res.userInfo.avatarUrl,
								userInfo: res.userInfo
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
						}
					});
				}
			}
		});
		
	},

	//获取用户信息
	onGetUserInfo: function(e) {
		if (!this.logged && e.detail.userInfo) {
			this.setData({
				logged: true,
				avatarUrl: e.detail.userInfo.avatarUrl,
				userInfo: e.detail.userInfo
			})
			//调用云函数,获取openId
			wx.cloud.init()
			wx.cloud.callFunction({
				name: 'login',
				data: {},
				success: res => {
					app.globalData.openid = res.result.openid;
				}
			})
		}
	},

	//进入主程序
	goin: function() {
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
				icon:'none',
				mask: true
			});
		}
	}

})
