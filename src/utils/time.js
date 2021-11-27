const formatDate = () => {
		let date = new Date();
		let year = date.getFullYear(); // 年
		let month = date.getMonth() + 1; // 月
		let day = date.getDate(); // 日
		let week = date.getDay(); // 星期
		let weekArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
		let hour = date.getHours(); // 时
		hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
		let minute = date.getMinutes(); // 分
		minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
		let second = date.getSeconds(); // 秒
		second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	}

const time = {
	formatDate:formatDate()
}
export default time