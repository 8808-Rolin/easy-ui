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
							<router-link :to="{name:'PublicCommunity', params:{aid:0, pid:notice.pid}}"
								class="notice_title"><strong>【系统公告】{{notice.title}}</strong>
							</router-link>
							<a><small>{{notice.date}}</small></a>
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
				<div style="width: 100% ;display: flex;align-items: center;line-height: 2.2;justify-content: space-around;">
					<span>交流社区</span>
					<span style="width:105px;display: block;display: flex;overflow: hidden;">
						<!-- <i class="move animated delay-7s iconfont icon-arrow-right"></i>
						<i class="move animated delay-6s iconfont icon-arrow-right"></i>
						<i class="move animated delay-5s iconfont icon-arrow-right"></i> -->
						<i class="move ar-animated ar-delay-4s el-icon-arrow-right"></i>
						<i class="move ar-animated ar-delay-3s el-icon-arrow-right"></i>
						<i class="move ar-animated ar-delay-2s el-icon-arrow-right"></i>
						<i class="move ar-animated ar-delay-1s el-icon-arrow-right"></i>
						<i class="move ar-animated el-icon-arrow-right"></i>
					</span>
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
				this.$router.push({
					path: '/public'
				})
			}
		},
		beforeMount() {
			this.$api.getSimpleNotice().then(
				res => {
					if (res.data.data.code > 0)
						this.notices = res.data.data.notice
				}
			)
		}
	}
</script>

<style scoped="scoped">
	.index_box {
		width: 80%;
		max-width: 75rem;
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
		background-size: auto 100%; 
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
		transition: all 300ms linear;
		will-change: all;
		cursor: pointer;
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
		text-align: center;
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
		transition: all 300ms linear;
	}

	.button_box:hover .enter {
		left: -30%;
		transition: all 300ms linear;
	}

	.button_box:hover .community {
		width: 100%;
		right: 0;
		transition: all 300ms linear;
	}

	.button_box .community>div {
		position: relative;
		top: -100%;
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
		height: 1.5rem;
		margin-bottom: 1rem;
		padding: 0.1875rem;
		z-index: 999;
		transition: all .5s;
	}

	.item:hover {
		transform: scale(1.048);
	}

	.notice_title {
		max-width: calc(100% - 5rem);
		max-height: 1.05rem;
		overflow: hidden;
		word-wrap: normal;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.index_right>>>.el-card__header {
		width: 100%;
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

	>>>.box-card {
		width: 100%;
		height: 25rem;
		border-top: #1DA0FB solid 0.75rem;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	>>>.el-card__body {
		width: 100%;
		height: 20rem;
		overflow-y: scroll;
	}

	/**滚动条的宽度*/
	.index_right>>>.el-card__body::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	.index_right>>>.el-card__body::-webkit-scrollbar-thumb {
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
			width: 110%;
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
		
		.community > div {
			justify-content: center !important;
		}
	}

	a {
		color: #000000;
	}

	/* 箭头动画 */
	@keyframes move {
		0% {
			left: 0%;
			opacity: 0;
		}

		70% {
			left: 70%;
			opacity: 1
		}

		100% {
			left: 100%;
			opacity: 0;
		}
	}

	.move {
		-webkit-animation-name: move;
		animation-name: move;
		position: relative;
		margin-left: -16px;
	}
	
	/* .move{
		width: 1rem;
		height: 1rem;
		color: #000000;
	} */

	.ar-animated {
		-webkit-animation-duration: 1.5s;
		animation-duration: 1.5s;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		animation-iteration-count: infinite;
		-webkit-animation-iteration-count: infinite;
		font-style: inherit;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
	}

	.ar-delay-1s {
		animation-delay: 0.1s;
	}

	.ar-delay-2s {
		animation-delay: 0.2s;
	}

	.ar-delay-3s {
		animation-delay: 0.3s;
	}

	.ar-delay-4s {
		animation-delay: 0.4s;
	}

	.ar-delay-5s {
		animation-delay: 0.5s;
	}

	.ar-delay-6s {
		animation-delay: 0.6s;
	}

	.ar-delay-7s {
		animation-delay: 0.7s;
	}

	.ar-delay-8s {
		animation-delay: 0.8s;
	}

	.ar-delay-9s {
		animation-delay: 0.9s;
	}

	.ar-delay-10s {
		animation-delay: 0.10s;
	}
</style>
