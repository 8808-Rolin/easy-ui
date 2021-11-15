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
					<div class="club_box">
						<!-- 社团logo和名称 -->
						<div class="club_img_name">
							
							<div class="club_img">
								<img src="../assets/profile.jpg">
							</div>
							<div class="club_name">社团名称</div>
						</div>
						
						<div class="club_img_name">
							<div class="club_img">
								<img src="../assets/profile.jpg">
							</div>
							<div class="club_name">社团名称</div>
						</div>
						
						<div class="club_img_name">
							<div class="club_img">
								<img src="../assets/profile.jpg">
							</div>
							<div class="club_name">社团名称</div>
						</div>
					</div>

				</div>

				<div class="school_club">
					<div class="club_title">
						学校社团
					</div>
					
					<div class="club_box">
						<div>文学社</div>
						<div>轻风文学社</div>
					</div>
				</div>
			</div>
			
			<div class="notice_box">
				<MakesNotice></MakesNotice>
			</div>
			
			<!-- 废物div -->
			<div style="height: 1rem;"></div>
		</div>
	</div>
</template>

<script>
	import HeaderHasSearch from '../components/HeaderHasSearch.vue'
	import Info from '../components/info.vue'
	import MakesNotice from '../components/MakesNotice.vue'

	export default {
		name: 'Public',
		data() {
			return {
				myMassOrganization:[],
				schoolMassOrganization:[],
				user:{}
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

	.my_club {
		width: 35%;
		padding: 0.5rem 1rem;
		border-right: #33333352 solid 0.0625rem;
	}

	.club_box {
		width: 100%;
		height: 8rem;
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.club_img_name {
		width: 5rem;
		height: 90%;
		margin-top: 1rem;
		margin-right: 1rem;
	}

	.club_img_name .club_img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
		overflow: hidden;
	}

	.club_img_name .club_img img {
		width: 100%;
		height: 100%;
	}

	.club_img_name .club_name {
		margin-top: 0.5rem;
		font-size: 0.75rem;
	}

	.school_club {
		width: 65%;
		right: 0;
		padding: 0.5rem 1rem;
	}
	
	.school_club .club_box div {
		margin-top: 0.375rem;
		margin-right: 0.75rem;
		padding: 0.5rem 0.5rem;
		border-radius: 0.375rem;
		border: dashed #1DA0FB 0.125rem;
	}

	.club_title {
		width: 6rem;
		padding: 0.5rem;
		background-color: #1DA0FB;
		color: #FFFFFF;
	}
	
	.main_box .notice_box {
		padding: 1rem;
		border-radius: 1rem;
		margin-top: 3rem;
		box-shadow: var(--box-shadow2);
	}
</style>
