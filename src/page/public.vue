<template>
	<div style="width: 100%;">
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
						<div v-if="myMassOrganization.length == 0" style="width: 100%;text-align: center;margin-top: 2.5rem;">未加入任何社团</div>
						<div class="club_img_name" v-for="item in myMassOrganization" :key="item.aid"
							@click="toCommunity(item.aid)">
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
						<div v-for="item in schoolMassOrganization" :key="item.aid" @click="toCommunity(item.aid)">
							<el-tooltip :content="item.assName" placement="top" :open-delay="500">
								<el-button>{{item.assName}}</el-button>
							</el-tooltip>
						</div>
					</div>
				</div>
			</div>

			<div class="notice_box">
				<div class="club_title">
					公共论坛
				</div>
				<MakesNotice :chaildPosts="posts" :chaildFirstPosts="firstposts" :total="code" :aid="paid" :notisSize="notSize" :tinymceId="'ptinymceId'"></MakesNotice>
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
	import GoToLable from '../components/goToLable.vue'
	import base from '../api/request/base.js'
	import {
		mapState
	} from 'vuex'

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
				limit:10,
				notSize:0,
				paid:0,
			}
		},
		props:['chaildPosts', 'chaildFirstPosts', 'total', 'aid', 'notisSize', 'tinymceId'],
		components: {
			HeaderHasSearch,
			Info,
			MakesNotice,
			GoToLable
		},
		methods: {
			getAssociationList() {
				this.$api.getShowData({
					uid: this.uid
				}).then(
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
				this.$api.getPostList({
					aid: 0,
					type: 1,
					page: null,
					limit: null
				}).then(
					res => {
						this.firstposts = res.data.data.posts
						this.notSize = res.data.data.code
						this.code = this.code
					}
				)
			},
			getPostList(aid, type, page, limit) {
				this.$api.getPostList({
					aid,
					type,
					page,
					limit
				}).then(
					res => {
						this.posts = res.data.data.posts
						this.code = res.data.data.code
						this.code = this.code
					}
				)
			},
			assImage(assImage) {
				return `${base.sq}${assImage}`
			},
			toCommunity(param) {
				this.$router.push({name:'Community', params:{'aid':param}})
			},
		},
		computed: {
			...mapState({
				uid: state => state.request.uid,
			}),
		},
		mounted() {
			this.$bus.$on('getPostList', this.getPostList)
			this.$bus.$on('getFistPostList', this.getFistPostList)
		},
		beforeMount() {
			this.getAssociationList()
			this.getFistPostList()
			this.getPostList(0, 2, this.page, this.limit)
		},
		beforeDestroy() {
			this.$bus.$off('getPostList')
			this.$bus.$off('getFistPostList')
		}
	}
</script>

<style scoped>
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
		background-color: var(--bg);
	}

	.main_box .club>div {
		position: absolute;
		height: 11rem;
		margin-top: 0.5rem;
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
		cursor: pointer;
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
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.school_club {
		width: 65%;
		right: 0;
		padding: 0.5rem 1rem;
	}

	.school_club .club_box {
		display: flex;
		flex-wrap: wrap;
		overflow: auto;
	}

	/**滚动条的宽度*/
	>>>.club_box::-webkit-scrollbar {
		width: 0.5rem;
		height: 100%;
	}

	/* 滚动条的滑块 */
	>>>.club_box::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	.school_club .club_box div {
		width: 8rem;
		margin-top: 0.375rem;
		margin-right: 0.75rem;
		border-radius: 0.375rem;
		border: none;
		cursor: pointer;
	}

	.school_club .club_box div .el-button {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		border: dashed #1DA0FB 0.125rem;
	}


	.club_title {
		width: 6rem;
		padding: 0.5rem;
		background-color: #1DA0FB;
		color: #FFFFFF;
		text-align: center;
	}

	.main_box .notice_box {
		padding: 1rem;
		border-radius: 1rem;
		margin-top: 3rem;
		box-shadow: var(--box-shadow2);
		background-color: var(--bg);
	}
	
	@media screen and (max-width: 480px) {
		.main_box {
			width: 98%;
			top: 1rem
		}
		
		.main_box * {
			box-sizing: border-box;
		}
		
		.main_box .info_box {
			display: none;
		}
		
		.main_box .club {
			width: 100%;
			height: 24rem;
			display: flex;
			flex-direction: column;
			border-radius: 0;
			background-color: #fff;
			box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04);
		}
		
		.main_box .club>div {
			position: static;
			width: 100%;
		}
		
		.main_box .club .my_club {
			border: none;
			border-bottom: rgba(0,0,0,.1) 0.0625rem solid;
		}
		
		.notice_box {
			background-color: #fff!important;
			box-shadow:  0 0.125rem 0.25rem rgba(0, 0, 0, .12), 0 0 0.375rem rgba(0, 0, 0, .04)!important;
		}
		
		.main_box .club .club_title, .notice_box .club_title{
			margin: auto;
			border-radius: 0.375rem;
		}
		
		.main_box .club .school_club .club_box >div{
			width: 30%;
			margin-top: 1rem;
			margin-right: 3%;
		}
	}
</style>
