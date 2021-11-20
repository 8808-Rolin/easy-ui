const appData = require("@/assets/emojis.json");

const arrayUnique = (arr, name) => {
	return arr.reduce((item, next) => {
		item.push(next.name);
		return item;
	}, []);
}

const analysisEmoji = content => {
	let pattern1 = /\[(.*?)\]/g //提取中括号的内容
	let pattern2 = /\([^\)]*\)/ //替换小括号的内容
	let arr = content.match(pattern1)
	let str = content
	const emojiList = arrayUnique(appData, 'name')
	str = str.replace(/\[/g, "(").replace(/\]/g, ")")
	if(arr) {
		arr.forEach((item, index) => {
			if (emojiList.indexOf(item) >= 0) {
				str = str.replace(pattern2,`<img src='${require('../assets/emoji/'+item+'.png')}'>`)
			} else {
				str = str.replace(/\(/, "[").replace(/\)/, "]")
			}	
		})
	}
	return str.replace(/\n/g, "<br/>").replace(/\(/, "[").replace(/\)/, "]")
}

export default analysisEmoji