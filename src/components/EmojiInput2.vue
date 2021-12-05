<template>
	<div class="emoji_input">
		<div>
			<el-input :rows="1" type="textarea" placeholder="请输入内容" v-model="content" @focus="riseDiv = true" @blur="riseDiv = false">
			</el-input>
			<el-tooltip class="submit-btn" content="请先加入该社团" :disabled="permission !== 0 || aid === '0' || aid === 0" placement="top">
				<el-button type="primary" @click="submitMessage" :disabled="content == ''" size="mini">发送</el-button>
			</el-tooltip>
		</div>
	
		<el-popover placement="bottom" v-show="permission !== 0 || aid === '0' || aid === 0" width="500" trigger="click" v-model="emojiShow">
			<el-button v-show="showBrowBtn" slot="reference" @click="loadEmojis;showBrow = !showBrow" size="mini">表&emsp;情</el-button>
			<div class="browBox" v-show="showBrow">
				<EmojiBox ref="emojibox" @addEmoji="addEmoji"></EmojiBox>
			</div>
		</el-popover>
	</div>
</template>

<script>
	import EmojiBox from './emoji2.vue'
	
	export default {
		name: 'Emoji',
		props:['permission', 'aid'],
		data() {
			return {
				//聊天输入内容
				content: "",
				//表情框是否展示
				emojiShow: false,
				//表情列表
				faceList: [],
				visible: false,
				showBrow: false,
				riseDiv: false,
				showBrowBtn: false
			}
		},
		methods: {
			//加载表情，存放到表情列表中
			loadEmojis() {
				this.$refs.emojibox.load()
			},
			submitMessage() {
				this.$emit("analysisEmoji", this.content)
				this.content = ""
			},
			/* 添加表情 **/
			addEmoji(val) {
				this.content = this.content + val
			},
		},
		components: {
			EmojiBox
		},
	}
</script>

<style lang="less" scoped="scoped">
	.el-popover {
		padding: 0;
	}

	.el-popover__reference-wrapper .el-button {
		font-size: 0.75rem;
		border: none;
		margin-top: 0.5rem;
		margin-left: 6.25rem;
		padding: 0.5rem 1rem;
		box-shadow: 0 0 0.1875rem rgba(0, 0, 0, .3);
		font-weight: bolder;
	}

	.emoji_input {
		width: 100%;
		padding: 0.5rem 0;
		position: fixed;
		bottom: 0;
		background-color: #fff;
		z-index: 9000;
		transition: all .3s;
	}
	
	.emoji_input2 {
		border-top: rgba(0,0,0,.1) 0.0625rem solid;
		bottom: 20rem;
	}

	.emoji_input>div {
		width: 100%;
		display: flex;
	}

	.browBox {
		width: 100%;
		height: 20rem;
		padding: 0;
		background: #e6e6e6;
		overflow: auto;
		position: fixed;
		bottom: 0;
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

	/deep/.el-textarea {
		width: 75%;
		margin-right: 0.75rem;
	}

	/deep/.el-textarea__inner {
		width: 100%;
		max-height: 6.25rem;
		border: 0.125rem #cdcdcd solid;
		resize: none;
	}

	/deep/.el-textarea__inner::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	/deep/.el-textarea__inner::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	.submit-btn {
		font-weight: bold;
		white-space: pre-wrap;
	}
</style>
