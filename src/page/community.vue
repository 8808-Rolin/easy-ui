<template>
	<div>
		<HeaderHasSearch></HeaderHasSearch>

		<div class="main_box">
			<Info></Info>

			<div class="club">
				<!-- 左边社团信息 -->
				<div class="club_mes">
					<div class="club_logo">
						<img src="../assets/profile.jpg">
					</div>
					<div class="mes">
						<div class="name">
							<div class="club_name">
								<strong>社团名称</strong>
							</div>
							<div class="join_club">
								<el-button>加入社团</el-button>
							</div>
						</div>
						<div class="club_superior">
							<strong>社团对接组织：</strong>社团联合会
						</div>
						<div class="club_intro">
							<small><strong>简介：</strong>简介内容</small>
						</div>
					</div>
				</div>

				<!-- 右边社团活动区 -->
				<div class="club_action">
					<el-card class="box-card">
						<div slot="header" class="clearfix">
							<span>社团活动</span>
						</div>
						<div v-for="o in 4" :key="o" class="text item">
							<a class="notice_title"><strong>{{'列表内容 ' + o }}</strong></a>
							<a><small>{{o}}</small></a>
						</div>
					</el-card>
				</div>
			</div>

			<div class="notice_box">
				<MakesNotice></MakesNotice>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderHasSearch from '../components/HeaderHasSearch.vue'
	import Info from '../components/info.vue'
	import MakesNotice from '../components/MakesNotice.vue'

	export default {
		name: 'Community',
		data() {
			return {

			}
		},
		components: {
			HeaderHasSearch,
			Info,
			MakesNotice
		},
		methods: {

		}
	}
</script>

<style>
	.main_box {
		width: 100%;
		max-width: 75rem;
		margin: auto;
		position: relative;
		top: 3rem;
	}

	.main_box .club {
		width: 100%;
		height: 12rem;
		margin-top: 0.625rem;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		box-shadow: var(--box-shadow2);
	}

	.main_box .club>div {
		position: absolute;
		height: 11rem;
	}

	.main_box .notice_box {
		padding: 1rem;
		margin-top: 3rem;
		border-radius: 1rem;
		box-shadow: var(--box-shadow2);
	}

	/* 左边信息框 */
	.club_mes {
		width: 70%;
		left: 0;
		padding: 0.3125rem;
		display: flex;
		align-items: center;
	}

	.club_mes .club_logo {
		width: 9rem;
		height: 9rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.club_mes .mes {
		width: calc(100% - 10rem);
		margin-left: 1.25rem;
		display: block;
		text-align: left;
	}

	.club_mes .mes .name {
		height: 3rem;
		font-size: 2rem;
		display: flex;
		justify-content: space-between;
	}
	
	.club_mes .mes .name .join_club .el-button {
		background-color: #1DA0FB;
		color: #FFFFFF;
		border: none;
		font-weight: bold;
		box-shadow: var(--box-shadow1);
	}

	.club_mes .mes .club_superior {
		height: 1.5rem;
	}

	.club_mes .mes .club_intro {
		height: 4.5rem;
	}


	/* 右边活动框 */
	.club_action {
		width: 30%;
		right: 0;
		padding: 0.3125rem;
	}

	/* 活动卡片 */
	.text {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item {
		width: 100%;
		padding: 0.5rem 0.25rem;
		margin-bottom: 0.1875rem;
		border-radius: 0.375rem;
		box-shadow: var(--box-shadow1);
	}

	.notice_title {
		width: 80%;
		max-height: 1.05rem;
		overflow: hidden;
		word-wrap: normal;
		text-align: left;
	}

	.el-card__header {
		width: 100%;
		background-color: #1DA0FB;
		color: #fff;
		z-index: 100;
		padding: 0.5rem 1.25rem;
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
		width: 100%;
		height: 100%;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.el-card__body {
		width: 100%;
		height: 100%;
		padding: 0.625rem;
		overflow-y: scroll;
		background-color: #FAFAFA;
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
