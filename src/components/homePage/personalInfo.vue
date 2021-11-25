<template>
	<div>
		<div class="info">
			<div class="title">
				<span v-show="status === 0">我的信息</span>
				<span v-show="status !== 0">他的信息</span>
				<el-button type="text" v-show="status !== 0" icon="el-icon-message" @click="centerDialogVisible2 = true">发送私信</el-button>
			</div>
			<p>手机号码：<span>{{user.phone}}</span></p>
			<el-tooltip :content="user.email" placement="top" :open-delay="500">
				<p>电子邮箱：<span>{{user.email}}</span></p>
			</el-tooltip>
			<p>所属院系：<span>{{user.college}}</span></p>
			<p>生&emsp;&emsp;日：<span>{{user.birth}}</span></p>
			<p>发帖数量：<span>{{user.numpost}}</span></p>
		</div>

		<div class="notice">
			<div class="title">
				公告
			</div>
			<div class="item_box">
				<el-input :class="{notice_text:status===0}" :debounce="500" v-bind:readonly="status!==0" @blur="updateNotice" autosize
					type="textarea" placeholder="请输入内容" v-model="user.notice"></el-input>
			</div>
		</div>
		
		
		<!-- 对话框，发送邮件 -->
		<el-dialog title="发送私信" :visible.sync="centerDialogVisible2" width="30%" center>
			<div class="form">
				<div>
					<label>私信标题：</label>
					<el-input v-model="input" placeholder="请输入内容"></el-input>
				</div>
				<div>
					<el-input type="textarea" :rows="10" v-model="input" placeholder="请输入私信标题"></el-input>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="centerDialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="centerDialogVisible2 = false">发送</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
	export default {
		name: 'PersonalInfo',
		props: ['user', 'status'],
		data(vm) {
			return {
				change: false,
				content:'',
				change:false,
				message:null,
				centerDialogVisible2: false,
				input:'',
				title:'',
			}
		},
		methods: {
			/* 修改我的公告 */
			updateNotice() {
				if (this.message !== null)
					this.message.close()
				let newProfile = this.user.notice
				let uid = this.user.uid
				if (this.status === 0) {
					if (this.change) {
						this.$api.updateNotice({newProfile, uid}).then(
							res => {
								this.message = this.$message.success(res.data.data.msg)
								this.content = ''
								this.change = false
							}
						)
					} else {
						this.message = this.$message.info("请先修改参数！！")
					}
				}
			},
		},
		computed:{
			notice() {
				return this.user.notice
			}
		},
		watch:{
			notice(newval, oldval) {
				if (this.content === '') 
					this.content = oldval !== undefined ? oldval : newval
					
				if(this.content === this.user.notice)
					this.change = false
				else 
					this.change = true
				// console.log(this.content, "=============", newval, this.change)
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.info {
		padding: 0.5rem;
		box-shadow: var(--box-shadow2);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			/deep/.el-button{
				padding: 0.25rem;
			}
		}

		p {
			line-height: 2;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			cursor: pointer;
		}
	}

	.notice {
		margin-top: 1rem;
		padding: 0.5rem;
		box-shadow: var(--box-shadow2);

		.title {
			padding: 0.5rem 0;
			border-bottom: solid 0.0625rem #999;
		}

		.item_box {
			height: 12rem;
			overflow: auto;

			/**滚动条的宽度*/
			&::-webkit-scrollbar {
				width: 0.5rem;
				height: 100%;
			}

			/* 滚动条的滑块 */
			&::-webkit-scrollbar-thumb {
				background: #1DA0FB;
				-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
				border-radius: 0.25rem;
			}
		}
	}

	/deep/.el-textarea__inner {
		height: 100% !important;
		min-height: 100% !important;
		// margin-top: 0.5rem;
		resize: none;
		background-color: transparent;
		border: none;

		/**滚动条的宽度*/
		&::-webkit-scrollbar {
			width: 0.5rem;
			height: 100%;
		}

		/* 滚动条的滑块 */
		&::-webkit-scrollbar-thumb {
			background: #1DA0FB;
			// -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
			border-radius: 0.25rem;
		}
	}

	/deep/.el-textarea {
		height: 100%;
	}
	
	/deep/.notice_text textarea:focus {
		font-size: 0.75rem;
		background-color: #f1f4f2;
		border-radius: 0.75rem;
	}
	
	.form {
		height: 18.75rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	
	.form>div {
		display: flex;
		align-items: center;
	}
	
	.form>div label {
		width: 6rem;
		line-height: 2;
	}
	
	/deep/.form textarea {
		resize: none;
		border: 0.0625rem solid #dcdfe6;
	}
</style>
