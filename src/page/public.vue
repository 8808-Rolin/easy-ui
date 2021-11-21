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
						<div class="club_img_name" v-for="item in myMassOrganization" :key="item.aid" @click="toCommunity(item.aid)">
							<div class="club_img">
								<img :src="assImage(item.assImage)">
							</div>
							<div class="club_name">{{item.assName}}</div>
						</div>
					</div>

				</div>

				<div class="school_club">
					<div class="club_title">
						学校社团
					</div>
					
					<div class="club_box">
						<div v-for="item in schoolMassOrganization" :key="item.aid" @click="toCommunity(item.aid)">{{item.assName}}</div>
					</div>
				</div>
			</div>
			
			<div class="notice_box">
				<MakesNotice :chaildPosts="posts" :chaildFirstPosts="firstposts" :total="code" :aid="paid"></MakesNotice>
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
	import base from '../api/request/base.js'

	export default {
		name: 'Public',
		data() {
			return {
				myMassOrganization:[],
				schoolMassOrganization:[],
				posts:[],
				firstposts:[],
				user:{},
				code:0,
				page:1,
				limit:8,
				notisSize:0,
				paid:0,
			}
		},
		props:['chaildPosts', 'chaildFirstPosts', 'total', 'aid'],
		components: {
			HeaderHasSearch,
			Info,
			MakesNotice
		},
		methods: {
			getAssociationList() {
				this.$api.getShowData({uid:2}).then(
					res => {
						if (res.data.data.code > 0) {
							this.schoolMassOrganization = this.arrayUnique(res.data.data.ass, 0)
							this.myMassOrganization = this.arrayUnique(res.data.data.ass, 1)
						}
					}
				)
			},
			arrayUnique(arr, isJoin) {
				const ass = arr.filter((item) => {
					if (item.isJoin === isJoin) 
						return true
				})
				return ass
			},
			getFistPostList() {
				this.$api.getPostList({aid:0,type:1,page:null,limit:null}).then(
					res => {
						this.firstposts = res.data.data.posts
						this.notisSize = res.data.data.code
						this.code = this.code + this.notisSize
					}
				)
			},
			getPostList(aid, type, page, limit) {
				this.$api.getPostList({aid,type,page,limit}).then(
					res => {
						console.log(res.data.data.posts)
						this.posts = res.data.data.posts
						this.code = res.data.data.code
						this.code = this.code + this.notisSize
					}
				)
			},
			assImage(assImage) {
				return `${base.sq}${assImage}`
			},
			toCommunity(param) {
				console.log(param)
				this.$router.push({name:'Community', params:{'aid':param}})
			},
		},
		mounted(){
			this.$bus.$on('getPostList',this.getPostList)
		},
		beforeMount() {
			this.getAssociationList()
			this.getFistPostList()
			this.getPostList(0,2,this.page,this.limit)
		},
		beforeDestroy() {
			this.$bus.$off('getPostList')
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
