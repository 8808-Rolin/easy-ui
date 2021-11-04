<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span><strong>论坛公告</strong></span>
			<el-button style="float: right; padding: 0.1875rem 0" type="text" icon="el-icon-more-outline"></el-button>
		</div>
		<div class="notice">
			<div v-for="(notice, index) in notices" :key="index" class="text item">
				<a class="notice_title">{{notice.title}}</a>
				<a>{{notice.time}}</a>
			</div>
		</div>

	</el-card>
</template>

<script>
	export default {
		name: 'Notice',
		data() {
			return {
				notices: [{
					title: '第一条公告,第一条公告,第一条公告,第一条公告,第一条公告,第一条公告,',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第二条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第9条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第0条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第6条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第7条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第5条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第4条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第2条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第1条公告',
					url: '',
					time: '2021-10-4'
				}, {
					title: '第3条公告',
					url: '',
					time: '2021-10-4'
				}]
			}
		}
	}
</script>

<style>
	.text {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		margin-bottom: 18px;
	}

	.notice_title {
		width: 80%;
		max-height: 1.05rem;
		overflow: hidden;
		word-wrap: normal;
		text-align: left;
	}

	.el-card__header {
		position: -webkit-sticky;
		position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 100;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 480px;
		height: 25rem;
		border-top: #1DA0FB solid 0.75rem;
		border-radius: 1.5rem;
	}
	
	.el-card__body {
		height: 20rem;
		overflow-y: scroll;
	}

	/**滚动条的宽度*/
	.el-card__body::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	.el-card__body::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}
</style>
