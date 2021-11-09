<template>
	<div>
		<HeaderHasSearch></HeaderHasSearch>

		<div class="main_box">
			<Info></Info>

			<div class="club">
				<div class="my_club">
					<div class="club_title">
						我的社团
					</div>
					<div class="club_img_name">
						<div class="club_img">
							<img src="../assets/profile.jpg">
						</div>
						<div class="club_name">社团名称</div>
					</div>
				</div>

				<div class="school_club">
					<div class="club_title">
						学校社团
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import HeaderHasSearch from '../components/HeaderHasSearch.vue'
	import Info from '../components/info.vue'

	export default {
		name: 'Community',
		data() {
			return {

			}
		},
		components: {
			HeaderHasSearch,
			Info
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
		top: 3.75rem;
	}

	.main_box .club {
		width: 100%;
		height: 10rem;
		margin-top: 0.625rem;
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
		box-shadow: var(--box-shadow2);
	}

	.main_box .club>div {
		position: absolute;
		height: 8.5rem;
		margin-top: 0.3125rem;
		background-color: #F2A373;
	}

	.my_club {
		width: 30%;
		left: 0.3125rem;
	}

	.my_club>div:not(0) {
		width: 3.5rem;
		height: 5rem;
	}
	
	.club_img_name {
		width: 4rem;
		height: 5.5rem;
		margin-top: 0.5rem;
		margin-left: 1rem;
	}

	.club_img_name .club_img {
		width: 4rem;
		height: 4rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.club_img_name .club_img img {
		width: 100%;
		height: 100%;
	}
	
	.club_img_name .club_name {
		font-size: 0.75rem;
	}

	.school_club {
		width: 65%;
		right: 0.3125rem;
	}

	.club_title {
		width: 6rem;
		padding: 0.5rem;
		background-color: #1DA0FB;
		color: #FFFFFF;
	}
</style>
