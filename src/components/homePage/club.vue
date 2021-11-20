<template>
	<div>
		<div class="clubs">
			<div class="club">
				<div class="logo">
					<img src="../../assets/profile.jpg">
				</div>
				<div class="name">
					社团名称
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MyClub',
		data() {
			return {

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.clubs {
		padding: 1rem 0;
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
				margin-top: 0.5rem;
			}
		}

	}
</style>
