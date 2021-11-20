<template>
	<div>
		<el-tabs class="top_box" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="我的社团" name="first">
				<MyClub></MyClub>
			</el-tab-pane>
		</el-tabs>

		<el-tabs class="bottom_box" v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="我的帖子" name="first">
				<Posts></Posts>
			</el-tab-pane>
			<el-tab-pane label="空间收藏" name="second">
				<Collection></Collection>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import MyClub from '../../../components/homePage/club.vue'
	import Posts from '../../../components/homePage/posts.vue'
	import Collection from '../../../components/homePage/collection.vue'
	
	export default {
		name: 'HisHome',
		data() {
			return {
				activeName: 'first'
			}
		},
		components: {
			MyClub,
			Posts,
			Collection
		}
	}
</script>

<style>
	.top_box {
		padding-bottom: 1rem;
		border-bottom: #999 0.0625rem solid;
	}

	.bottom_box {
		margin-top: 1rem;
	}
</style>
