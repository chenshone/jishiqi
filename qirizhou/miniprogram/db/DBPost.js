class DBPost {
	constructor(dateId, itemId) {
		this.keyDateList = 'dateList';
		this.keyDateListNum = 'dateListNum';
		this.keyDateListLen = 'dateListLen';
		this.dateId = dateId;
		this.itemId = itemId;
	}

	getAllPostData() {
		let res = wx.getStorageSync(this.keyDateList);
		return res;
	}

	getAllPostDataNum() {
		let res = wx.getStorageSync(this.keyDateListNum);
		return res;
	}

	getAllPostDataLen() {
		let res = wx.getStorageSync(this.keyDateListLen);
		return res;
	}

	//保存或更新缓存
	execSetdateList(key, data) {
		wx.setStorageSync(key, data);
	}
	execSetdateListNum() {
		let list = wx.getStorageSync(this.keyDateList);
		let ListNum = [];
		let j = 0;
		for (let i of list) {
			let a = 0,
				b = 0,
				c = 0,
				d = 0;
			for (let k of i.things) {
				if (k.level === 1) a++;
				else if (k.level === 2) b++;
				else if (k.level === 3) c++;
				else d++;
			}
			ListNum[j] = {
				allNum: i.things.length,
				aNum: a,
				bNum: b,
				cNum: c,
				dNum: d
			}
			j++;
		}
		wx.setStorageSync(this.keyDateListNum, ListNum);
	}
	execSetdateListLen() {
		let len = wx.getStorageSync(this.keyDateList).length;
		wx.setStorageSync(this.keyDateListLen, len);
	}

	//更新全部缓存
	updateStorageSnyc(key, value, self) {
		self.execSetdateList(key, value);
		self.execSetdateListLen();
		self.execSetdateListNum();
	}

	//更新列表缓存
	updateDateList(data) {
		let listLen = this.getAllPostDataLen();
		let list = this.getAllPostData();
		const self = this;
		//是否为空
		if (!list) {
			list = [];
			list.push({
				month: data.month,
				day: data.day,
				year: data.year,
				week: data.week,
				weekNum:data.weekNum,
				things: [data.things]
			})
			//更新缓存
			this.updateStorageSnyc(self.keyDateList, list, self);
			wx.reLaunch({
				url: '/pages/list/list'
			})
		}
		//是否到另一周
		else if ((data.year == list[listLen - 1].year && list[listLen - 1].weekNum != data.weekNum) || (data.year != list[listLen - 1].year)) {
			wx.showModal({
				title: '提示',
				content: '准备好进入下一段七日时轴了吗?(将清除上一段七日轴的便签)', //建议重想文案
				success(res) {
					if (res.confirm) {
						list = [];
						list.push({
							month: data.month,
							day: data.day,
							year: data.year,
							week: data.week,
							weekNum:data.weekNum,
							things: [data.things]
						});
						//更新缓存
						self.updateStorageSnyc(self.keyDateList, list, self);
						wx.reLaunch({
							url: '/pages/list/list'
						})
					}
				}
			})
		}

		//是否为同一天的记录
		else if (list[listLen - 1].day == data.day && list[listLen - 1].month == data.month && list[listLen - 1].year ==
			data.year) {
			let things = list[listLen - 1].things;
			things.unshift(data.things);
			//更新缓存
			this.updateStorageSnyc(self.keyDateList, list, self);
			wx.reLaunch({
				url: '/pages/list/list'
			})
		} else {
			list.push({
				month: data.month,
				day: data.day,
				year: data.year,
				week: data.week,
				weekNum:data.weekNum,
				things: [data.things]
			})
			//更新缓存
			this.updateStorageSnyc(self.keyDateList, list, self);
			wx.reLaunch({
				url: '/pages/list/list'
			})
		}
	}

	//获得指定事件的数据
	getListItemById() {
		let list = this.getAllPostData();
		let dateItem = list[this.dateId];
		return {
			year: dateItem.year,
			month: dateItem.month,
			day: dateItem.day,
			item: dateItem.things[this.itemId],
			itemListLen: dateItem.things.length
		}
	}

	//删除事件
	updateDel() {
		const self = this;
		let list = this.getAllPostData();
		let dateItem = list[this.dateId];
		dateItem.things.splice(this.itemId, 1);
		if (dateItem.things.length == 0) {
			list.splice(this.dateId, 1);
			if (list.length == 0) {
				wx.clearStorageSync();
			} else {
				this.updateStorageSnyc(self.keyDateList, list, self);
			}
		} else {
			this.updateStorageSnyc(self.keyDateList, list, self);
		}
	}

	//存储完成项
	updateOk(finished, finishedTxt) {
		const self = this;
		let list = this.getAllPostData();
		let dateItem = list[this.dateId];
		dateItem.things[this.itemId].finished = finished;
		dateItem.things[this.itemId].finishedTxt = finishedTxt;
		this.updateStorageSnyc(self.keyDateList, list, self);
	}
};

export {
	DBPost
}
