// pages/w/w.js
Page({
	onReady: function() {

		var isFirst = wx.getStorageSync('isFirst');
		if (!isFirst) {
			wx.setStorageSync('isFirst', true)
			wx.reLaunch({
				url: '/pages/event_queue/event_queue'
			})
		} else {
			wx.reLaunch({
				url: '/pages/list/list'
			})
		}
	}
})
