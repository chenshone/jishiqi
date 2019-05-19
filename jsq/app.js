//app.js

App({
	onLaunch: function() {
		var storageData = wx.getStorageSync('dateList');
		if (!storageData) {
			//如果不存在缓存
			var dataObj = require("data/date.js")
			wx.clearStorageSync();
			wx.setStorageSync('dateList', dataObj.dateList);
		}
	}
})
