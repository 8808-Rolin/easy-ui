Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@lpc528150 
8808-Rolin
/
easy-ui
Public
1
20
Code
Issues
Pull requests
<template>
	<div>
		<Header></Header>
		<div class="index_box">
			<div class="index_left"></div>

			<div class="index_right">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>论坛公告</span>
						<el-button style="float: right; padding: 0.1875rem 0" type="text" icon="el-icon-more-outline">
						</el-button>
					</div>
					<div class="notice">
						<div v-for="(notice, index) in notices" :key="index" class="text item">
							<router-link :to="{path:'/'}" class="notice_title"><strong>{{notice.title}}</strong></router-link>
							<a><small>{{notice.time}}</small></a>
						</div>
					</div>

				</el-card>
			</div>
		</div>

		<div class="button_box">
			<div class="enter">
				<span>进入</span>
			</div>
			<div class="community" @click="toPublic">
				交流社区&emsp;
				<div class="point_box">
					<div class="points">
						<i class="el-icon-arrow-right el-icon--right" style="--i:0.1"></i>
						<i class="el-icon-arrow-right el-icon--right" style="--i:0.4"></i>
						<i class="el-icon-arrow-right el-icon--right" style="--i:0.7"></i>
						<i class="el-icon-arrow-right el-icon--right" style="--i:0.4"></i>
						<i class="el-icon-arrow-right el-icon--right" style="--i:0.1"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script>
	import Header from '../components/Header'
	import LocalStorage from '../utils/LocalStorage'	
	export default {
		name: 'Index',
		data() {
			return {
				notices: [],
			}
		},
		components: {
			Header,
		},
		methods: {
			toPublic() {
				this.$router.push({path: '/public'})
			}
		},
		beforeMount() {
			console.log("数据加载处理.....")
			/* this.$api.getSimpleNotice().then(
				res => {
					console.log(res.data.data.notice)
					if (res.data.data.code > 0)
						this.notices = res.data.data.notice
				}
			) */
		}
	}
</script>

<style>
	.index_box {
		width: 80%;
		height: 37.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -45%);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.index_box>div {
		height: 100%;
	}
	.index_left {
		width: 50%;
		background: url(../assets/logo-imgalpha-nologo-600px.png) no-repeat;
		background-size: 100%;
	}
	.index_right {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.button_box {
		width: 50%;
		height: 6rem;
		border-top-left-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
		border: #1DA0FB 0.0625rem solid;
		position: fixed;
		right: -35%;
		bottom: 4.5rem;
		overflow: hidden;
		transition: 1.33s;
	}
	.button_box>div {
		height: 100%;
		position: absolute;
		float: left;
		font-size: 2.5rem;
		font-weight: bold;
		transition: 1.33s;
	}
	.button_box>div::before {
		display: inline-block;
		content: "";
		height: 100%;
		vertical-align: middle;
	}
	.enter {
		width: 30%;
		left: 0;
		background-color: #fff;
		color: #1DA0FB;
		z-index: -1;
	}
	.community {
		width: 100%;
		right: -30%;
		background-color: #1DA0FB;
		border: #1DA0FB 0.0625rem solid;
		color: #fff;
		font-style: italic;
	}
	.button_box:hover {
		transform: translateX(-70%);
		transition: 1.33s;
	}
	.button_box:hover .enter {
		left: -30%;
		transition: 1.33s;
	}
	.button_box:hover .community {
		width: 100%;
		right: 0;
		transition: 1.33s;
	}
	.community .point_box {
		width: 9rem;
		height: 100%;
		position: absolute;
		top: 0;
		right: 1rem;
		overflow: hidden;
	}
	.community .point_box .points {
		width: 100%;
		height: 100%;
		position: relative;
		left: -6.25rem;
		display: flex;
		flex-direction: row;
		align-items: center;
		animation: changeColor 3s infinite;
	}
	.community .point_box .points i {
		--r: 0.3;
		--t: calc((var(--r) + var(--i)));
		color: rgb(255, 255, 255);
		opacity: var(--t);
	}
	/* 公告 */
	.text {
		font-size: 14px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.item {
		width: 98%;
		height: 1.875rem;
		margin-bottom: 18px;
		border-bottom: 0.0625rem solid rgba(0, 0, 0, .25);
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
		height: 25rem;
		border-top: #1DA0FB solid 0.75rem;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
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
	@keyframes changeColor {
		0,
		100% {
			left: -6.25rem;
		}
		33.3% {
			left: -3.125rem;
		}
		66.6% {
			left: 0;
		}
	}
	@media screen and (max-width: 48rem) {
		.index_left {
			width: 0;
		}
		.index_right {
			width: 100%;
		}
		.button_box {
			width: 80%;
			height: 6rem;
			right: 50%;
			transform: translateX(50%);
			bottom: 4.5rem;
			border-radius: 0.375rem;
		}
		.button_box:hover {
			transform: translateX(50%);
		}
		.enter {
			left: -30%;
		}
		.community {
			right: 0;
		}
	}
</style>