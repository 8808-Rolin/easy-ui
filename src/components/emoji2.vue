<template>
	<el-tabs type="border-card">
		<el-tab-pane>
			<span slot="label"><img src="../assets/imgs/emoji/[2233娘_怒].png"></span>
			<ul class="emoji-container">
				<li v-for="(item, index) in faceList" :key="index" @click="shoseEmoji(item)">
					<a href="javaScript:;">
						<img :src="item.url" alt="">
					</a>
				</li>
			</ul>
		</el-tab-pane>
		<el-tab-pane>
		 <span slot="label"><img src="../assets/imgs/emoji/[2233娘_怒].png"></span>
			<ul class="emoji-container">
				<li v-for="(item, index) in faceList" :key="index" @click="shoseEmoji(item)">
					<a href="javaScript:;">
						<img :src="item.url" alt="">
					</a>
				</li>
			</ul>
		</el-tab-pane>
		<el-tab-pane>
		 <span slot="label"><img src="../assets/imgs/emoji/[2233娘_怒].png"></span>
			<ul class="emoji-container">
				<li v-for="(item, index) in faceList" :key="index" @click="shoseEmoji(item)">
					<a href="javaScript:;">
						<img :src="item.url" alt="">
					</a>
				</li>
			</ul>
		</el-tab-pane>
		<el-tab-pane>
			<span slot="label"><img src="../assets/imgs/emoji/[2233娘_怒].png"></span>
			<ul class="emoji-container">
				<li v-for="(item, index) in faceList" :key="index" @click="shoseEmoji(item)">
					<a href="javaScript:;">
						<img :src="item.url" alt="">
					</a>
				</li>
			</ul>
		</el-tab-pane>
	</el-tabs>

	</div>
</template>

<script>
	export default {
		name: 'emoji',
		data() {
			return {
				activeFace: 'face',
				faceList: [ // 存放在本地文件的图片的获取方式需要用require
					{
						value: '\ud83d\ude00',
						url: require('../assets/imgs/emoji/[2020].png')
					}, // value为表情对应的unicode码，url为路径
					{
						value: '\ud83d\ude01',
						url: require('../assets/imgs/emoji/[doge].png')
					}
				]
			}
		},
		methods: {
			shoseEmoji(emoji) {
				this.$emit('select', emoji)
			}
		}
	}
</script>

<style>
	.emoji {
		width: 480px;
		height: 186px;
		bottom: 50px;
		background: #fff;
		z-index: 10;
		padding: 10px;
		margin-right: 10px;
		background: white;
		overflow-y: scroll;
		border-radius: 10px;
	}

	.emoji-container {
		overflow-y: auto;
		overflow-x: hidden;
		position: relative;
	}

	.emoji-container li {
		float: left;
		width: 30px;
		height: 30px;
		margin: 5px
	}

	.emoji-container li a {
		display: block;
		float: left;
		overflow: hidden;
		width: 35px;
		height: 35px;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all ease-out .2s;
		border-radius: 4px;
	}

	.emoji-container li a img {
		display: block;
		width: 30px;
		height: 30px;
	}

	.emoji-container li a:hover {
		background-color: #d8d8d8;
		border-color: #d8d8d8;
	}

	.el-tabs__item span {}

	.el-tabs__item img {
		width: 1.375rem;
		height: 1.375rem;
	}
</style>
