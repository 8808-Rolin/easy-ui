<template>
	<div class="emoji_input">
		<div>
			<el-input :rows="5" type="textarea" placeholder="请输入内容" @keyup.enter.native="submitMessage"
				v-model="content">
			</el-input>
			<el-button class="submit-btn" type="primary" @click="submitMessage" :disabled="content == ''">发&emsp;送评&emsp;论
			</el-button>
		</div>

		<el-popover placement="bottom" width="500" trigger="click" v-model="emojiShow">
			<el-button slot="reference">表&emsp;情</el-button>
			<div class="browBox">
				<EmojiBox></EmojiBox>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import EmojiBox from './emoji2.vue'

	const appData = require("@/assets/emojis.json");

	export default {
		name: 'Emoji',
		data() {
			return {
				//聊天输入内容
				content: "",
				//表情框是否展示
				emojiShow: false,
				//表情列表
				faceList: [],
				//表情文本
				getBrowString: "",
				visible: false
			}
		},
		created() {
			this.loadEmojis();
		},
		methods: {
			//加载表情，存放到表情列表中
			loadEmojis() {
				for (let i in appData) {
					this.faceList.push(appData[i].char);
				}
			},
			// 获取用户点击之后的标签 ，存放到输入框内
			getBrow(index) {
				for (let i in this.faceList) {
					if (index == i) {
						console.log(this.faceList[index])
						this.getBrowString = this.faceList[index];
						this.content += this.getBrowString;
					}
				}
				this.emojiShow = false;
			},
			submitMessage() {
				//提交。。。
			}
		},
		components: {
			EmojiBox
		}

	}
</script>

<style lang="less">
	.el-popover {
		padding: 0;
	}

	.el-popover__reference-wrapper .el-button {
		font-size: 0.75rem;
		margin-top: 0.5rem;
		margin-left: 6.25rem;
		font-weight: bolder;
	}

	.emoji_input {
		width: 100%;
	}

	.emoji_input>div {
		width: 100%;
		margin-left: 6.25rem;
		display: flex;
	}

	.browBox {
		width: 100%;
		padding: 0;
		background: #e6e6e6;
		overflow: auto;
	}

	.browBox::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	.browBox::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}
	
	.el-textarea {
		width: 75%;
		margin-right: 0.75rem;
	}

	.el-textarea__inner {
		width: 100%;
		height: 6.25rem;
		border: 0.125rem #cdcdcd solid;
		resize: none;
	}

	.el-textarea__inner::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	.el-textarea__inner::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	.submit-btn {
		width: 6.25rem;
		height: 6.25rem;
		margin: 0;
		float: right;
		font-weight: bold;
		white-space: pre-wrap;
		line-height: 2.5;
	}
</style>
