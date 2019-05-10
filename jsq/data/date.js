var dateList = [{
	date:"5月5日",
	year:"2019",
	week:"周日",
	athings:[{
		title:"打工1",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	bthings:[{
		title:"打工2",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	cthings:[{
		title:"打工3",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	dthings:[{
		title:"打工4",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}]
	
},
{
	date:"5月6日",
	year:"2019",
	week:"周一",
	athings:[{
		title:"打工5",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	bthings:[{
		title:"打工6",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	cthings:[{
		title:"打工7",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}],
	dthings:[{
		title:"打工8",
		content:"按时大大娃娃发发发我方法的飞洒发"
	}]
	
}
]

var dateListNum = [];
let j = 0;
for(let i of dateList){
	dateListNum[j] = {
		allNum:i.athings.length + i.bthings.length + i.cthings.length + i.dthings.length,
		aNum:i.athings.length,
		bNum:i.bthings.length,
		cNum:i.cthings.length,
		dNum:i.dthings.length
	}
	j++;
}
module.exports = {
	dateList:dateList,
	dateListLen:dateList.length,
	dateListNum:dateListNum,
	dateListNumLen:dateListNum.length
}