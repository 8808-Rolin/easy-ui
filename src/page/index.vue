<template>
	<div>
		<Header></Header>
		<div class="index_box">
			<div class="index_left"></div>

			<div class="index_right">
				<Notice></Notice>

			</div>
		</div>

		<div class="button_box">
			<div class="enter">
				<span>进入</span>
			</div>
			<div class="community">
				交流社区<i class="el-icon-arrow-right el-icon--right" style="--i:3"></i><i
					class="el-icon-arrow-right el-icon--right" style="--i:2"></i><i
					class="el-icon-arrow-right el-icon--right" style="--i:1"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '../components/Header.vue'
	import Notice from '../components/notice.vue'

	export default {
		name: 'Index',
		data() {
			return {

			}
		},
		components: {
			Header,
			Notice
		},
		methods: {},
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
		width: 37.5rem;
		background: url(../assets/logo-imgalpha-nologo-600px.png);
		background-size: cover;
	}

	.index_right {
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

	.button_box div {
		height: 100%;
		position: absolute;
		float: left;
		font-size: 2.5rem;
		font-weight: bold;
		transition: 1.33s;
	}

	.button_box div::before {
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

	.community i {
		--r: 0.1;
		--t: calc(var(--r) * var(--i));
		color: rgba(0, 0, 0, var(--t));
		animation: changeColor 1s linear infinite;
	}

	@keyframes changeColor {

		0 {
			--r: 0.1;
		}

		33.3% {
			--r: 0.4;
		}

		66.6% {
			--r: 1.33;
		}
	}
</style>
