<template>
	<div>
		<el-tabs :lazy="true" v-model="activeName" type="border-card" @tab-click="tabClick">
			<el-tab-pane v-for="(item, index) in type" :key="item.type" :label="item.type" :name="item.type">
				<span slot="label"><img :src="`${require('../assets/emoji/'+item.name+'.png')}`"></span>
				<ul class="emoji-container">
					<li v-for="(val, ind) in faceList" :key="ind" @click="shoseEmoji(val.name)"
						v-show="val.type === item.type"> 
						<a href="javaScript:;">
							<img :src="`${require('../assets/emoji/'+val.name+'.png')}`">
						</a>
					</li>
				</ul>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	const appData = require("@/assets/emojis.json");
	export default {
		name: 'emoji',
		data() {
			return {
				activeFace: 'face',
				faceList: [],
				type: [],
				val:"",
				activeName:"default",
			}
		},
		methods: {
			shoseEmoji(emoji) {
				this.val = emoji
				this.imgClick()
			},
			arrayUnique(arr, name) {
				const hash = {};
				return arr.reduce((item, next) => {
					hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
					return item;
				}, []);
			},
			load() {
				const arr = this.arrayUnique(appData, 'type')
				this.type = arr
				this.activeName = 'default'
				this.faceList = appData.filter(item => {
					if (item.type === 'default')
						return true
				})
			},
			tabClick(type, event) {
				this.faceList = appData.filter(item => {
					if (item.type === type.label)
						return true
				})
			},
			imgClick() {
				this.$emit('addEmoji', this.val)
			}
		},
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
	
	.el-tabs__nav-prev, .el-tabs__nav-next {
		font-size: 1.5rem;
	}
</style>
