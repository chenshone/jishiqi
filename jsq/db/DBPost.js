class DBPost{
	constructor(url) {
	    this.storageKeyName = 'dateList';
	}
	
	getAllPostData(){
		let res = wx.setStorageSync(this.storageKeyName);
		if(!res){
			res = require('../data/date.js').dateList;
			this.execSetStorageSync(res);
		}
		return res;
	}
	
	getAllPostDataNum(){
		let res = wx.setStorageSync(this.storageKeyName);
		if(!res){
			res = require('../data/date.js').dateListNum;
			this.execSetStorageSync(res);
		}
		return res;
	}
	
	getAllPostDataLen(){
		let res = wx.setStorageSync(this.storageKeyName);
		if(!res){
			res = require('../data/date.js').dateListLen;
			this.execSetStorageSync(res);
		}
		return res;
	}
	
	//保存或更新缓存
	execSetStorageSync(data){
		wx.setStorageSync(this.storageKeyName,data);
	}
};

export {DBPost}