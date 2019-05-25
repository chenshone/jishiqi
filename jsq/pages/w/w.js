// pages/w/w.js
Page({
	onReady: function() {
		var isFirst = wx.getStorageSync('dateList');
		if (isFirst.length>0) {
			wx.reLaunch({
				url: '/pages/list/list'
			})
		} else {
			wx.reLaunch({
				url: '/pages/new/new'
			})
		}
	}
})
