<template>
	<div>
		<div class="clubs">
			<div class="club" v-for="(item, index) in ass" :key="item.aid">
				<div class="logo" @click="toCommunity(item.aid)">
					<img :src="assImage(item.profile)">
				</div>
				<el-tooltip :content="item.name" placement="bottom" :open-delay="500">
					<div class="name" @click="toCommunity(item.aid)">{{item.name}}</div>
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script>
	import base from '@/api/request/base.js'
	export default {
		name: 'MyClub',
		props:['ass'],
		data() {
			return {

			}
		},
		methods:{
			assImage(image) {
				return `${base.sq}${image}`
			},
			toCommunity(aid) {
				this.$router.push({name:'Community', params:{aid}})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.clubs {
		padding: 1rem 0;
		display: flex;
		align-items: center;
		.club {
			width: 6.25rem;
			margin-right: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.logo {
				width: 6rem;
				height: 6rem;
				border-radius: 50%;
				overflow: hidden;

				img {
					width: 100%;
				}
			}

			.name {
				width: 100%;
				margin-top: 0.5rem;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				cursor: pointer;
				text-align: center;
			}
		}

	}
</style>
