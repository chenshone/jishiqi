var dateList = [{
	date:"5月5日",
	year:"2019",
	week:"周日",
	things:[{
		title:"打工1",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:1,
		time:"00:00"
	},
	{
		title:"打工2",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:2,
		time:"00:00"
	},
	{
		title:"打工3",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:3,
		time:"00:00"
	},
	{
		title:"打工4",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:4,
		time:"00:00"
	}]
},
{
	date:"5月6日",
	year:"2019",
	week:"周一",
	things:[{
		title:"打工5",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:1,
		time:"00:00"
	},
	{
		title:"打工6",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:2,
		time:"00:00"
	},
	{
		title:"打工7",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:3,
		time:"00:00"
	},
	{
		title:"打工8",
		content:"按时大大娃娃发发发我方法的飞洒发",
		level:4,
		time:"00:00"
	}]
}
]

var dateListNum = [];
let j = 0;


for(let i of dateList){
	let a = 0,b = 0,c = 0,d = 0;
	for(let k of i.things){
		if(k.level === 1) a++;
		if(k.level === 2) b++;
		if(k.level === 3) c++;
		if(k.level === 4) d++;
	}
	dateListNum[j] = {
		allNum:i.things.length,
		aNum:a,
		bNum:b,
		cNum:c,
		dNum:d
	}
	j++;
}
module.exports = {
	dateList:dateList,
	dateListLen:dateList.length,
	dateListNum:dateListNum,
	dateListNumLen:dateListNum.length
}