<template>
	<div>
		<el-table class="table" :data="posts" stripe style="width: 100%" @row-click="toP"
			:header-row-style="{height:'4rem'}" :row-style="{height:'4rem'}">
			<el-table-column prop="postType" label="类型" width="150">
				<template scope="scope">
					<span class="blod" :class="{red: scope.row.postType == '系统公告'}">{{ scope.row.postType}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="postTitle" label="标题" width="400">
				<template scope="scope">
					<el-tooltip :content="scope.row.postTitle" placement="top" :open-delay="500">
						<span class="title" :class="{red: scope.row.postType == '系统公告'}">{{ scope.row.postTitle}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="postAuthor" label="发帖用户" width="150">
				<template scope="scope">
					<span :class="{blod: scope.row.postType == '系统公告'}">{{ scope.row.postAuthor}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="replies" label="回复数" width="120">
				<template scope="scope">
					<span :class="{blod: scope.row.postType == '系统公告'}">{{ scope.row.replies}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="replyTime" label="最后回复时间" width="160">
				<template scope="scope">
					<span :class="{blod: scope.row.postType == '系统公告'}">{{ scope.row.replyTime}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="releaseTime" label="发布时间" width="150">
				<template scope="scope">
					<span :class="{blod: scope.row.postType == '系统公告'}">{{ scope.row.releaseTime}}</span>
				</template>
			</el-table-column>
		</el-table>

		<div style="margin-top: 0.625rem;">
			<Pagination :total="total" :PageSize="10" :notisSize="notisSize"></Pagination>
		</div>

		<el-divider></el-divider>

		<div class="meal_wrap" v-show="aid !== 0 && permission !== 0 || aid === 0? true : false">
			<div>
				<div class="title_makes_notice"><i class="el-icon-s-promotion"></i>&ensp;发表新帖</div>
				<div class="tinymce-btn">
					<button type="primary" @click="releasePost">发&emsp;表</button>
				</div>
			</div>
			<div class="title">
				<el-select v-model="value" placeholder="请选择">
					<el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
					</el-option>
				</el-select>
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</div>
			<div class="tinymce-box">
				<keep-alive :max="10">
					<TEditor :is="view" ref="tinymceRef" :updateContent.sync="content" :tinymceId="tinymceId"></TEditor>
				</keep-alive>
			</div>
			<!-- <div>富文本框内容：{{tinymceObj}}</div> -->
			<div style="margin-top: 1rem;display: flex;line-height: 2;">
				<span><strong>帖子标签：</strong></span>
				<el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
					@close="handleClose(tag)">
					{{tag}}
				</el-tag>


				<el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
					@keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
				</el-input>
				<el-button v-else class="button-new-tag" size="small" @click="showInput">添加标签</el-button>
			</div>
		</div>
	</div>

</template>

<script>
	import TEditor from '@/components/tinymce'
	import Pagination from './Pagination.vue'
	import {
		mapState
	} from 'vuex'

	export default {
		components: {
			TEditor,
			Pagination,
		},
		props: ['chaildPosts', 'chaildFirstPosts', 'total', 'aid', 'PageSize', 'notisSize', 'permission', 'tinymceId'],
		data() {
			return {
				view: 'TEditor',
				message: null,
				posts: [],
				options: [],
				value: '',
				input: '',
				// 标签
				dynamicTags: [],
				inputVisible: false,
				inputValue: '',
				content: '',
			}
		},
		methods: {

			// 标签添加
			handleClose(tag) {
				this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
			},
			showInput() {
				this.inputVisible = true;
				this.$nextTick(_ => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if (inputValue) {
					this.dynamicTags.push(inputValue);
				}
				this.inputVisible = false;
				this.inputValue = '';
			},
			/* 发表新帖 */
			releasePost() {
				if (this.message !== null)
					this.message.close()
				let mes = {
					uid: this.uid,
					releaseArea: this.aid,
					postType: this.value,
					postTitle: this.input,
					content: this.content,
					tags: this.listUpdteString(this.dynamicTags),
				}
				let arr = Object.values(mes).filter(item => {
					if (item !== '') {
						return true
					}
				})
				if (arr.length >= 6) {
					this.$api.releasePost(mes).then(
						res => {
							this.$bus.$emit('getFistPostList', 2, 1, 10)
							this.$bus.$emit('getPostList', 0, 2, 1, 10)
							this.$bus.$emit('cgetPostList', 1, 1, 10)
							this.content = ''
							this.dynamicTags = []
							this.input = ''
							this.value = ''
							// 清空富文本框
							this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body')
								.innerHTML = '';
							this.$message.success("发表成功！")
							document.documentElement.scrollTop = 10
						}
					)
				} else {
					this.message = this.$message.error('请完善数据')
				}
			},
			listUpdteString(arr) {
				let str = ''
				arr.forEach(item => {
					str += item + ','
				})
				return str
			},
			getPostType() {
				this.$api.getPostType().then(
					res => {
						if (this.$route.name === 'Public' && this.user.level === 2) {
							this.options = res.data.data
						} else if (this.$route.name === 'Community' && this.permission === 2) {
							this.options = res.data.data
						} else {
							let options = res.data.data.reduce((item, next) => {
								if (next !== '系统公告') item.push(next);
								return item;
							}, []);
							console.log(options)
							this.options = options;
						}
					}
				)
			},
			toP(row) {
				let aid = this.aid
				this.$router.push({
					name: 'PublicCommunity',
					params: {
						aid,
						'pid': row.pid
					}
				})
			},
		},
		computed: {
			...mapState({
				uid: state => state.request.uid,
				user: state => state.message.user,
			}),
		},
		watch: {
			chaildFirstPosts: {
				deep: true,
				handler() {
					if (this.chaildFirstPosts !== null && this.chaildPosts !== null)
						this.posts = this.chaildFirstPosts.concat(this.chaildPosts)
					else if (this.chaildFirstPosts !== null)
						this.posts = this.chaildFirstPosts
					else if (this.chaildPosts !== null)
						this.posts = this.chaildPosts
				}
			},
			chaildPosts: {
				deep: true,
				handler() {
					if (this.chaildFirstPosts !== null && this.chaildPosts !== null)
						this.posts = this.chaildFirstPosts.concat(this.chaildPosts)
					else if (this.chaildFirstPosts !== null)
						this.posts = this.chaildFirstPosts
					else if (this.chaildPosts !== null)
						this.posts = this.chaildPosts
				}
			},
		},
		beforeMount() {
			this.getPostType()
		}
	};
</script>

<style scoped="scoped">
	.meal_wrap>div:first-child {
		height: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	>>>.el-table__row td {
		cursor: pointer;
	}

	.title {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	>>>.el-table__body-wrapper::-webkit-scrollbar {
		width: 100%;
		height: 0.5rem;
	}

	>>>.el-table__body-wrapper::-webkit-scrollbar-thumb {
		background: #1DA0FB;
		-webkit-box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		border-radius: 0.25rem;
	}

	.meal_wrap .title {
		padding: 0.5rem 0;
		display: flex;
		align-items: center;
	}

	.meal_wrap .title .el-select {
		width: 12.5rem;
		margin-right: 0.625rem;
	}

	.title_makes_notice {
		margin-left: 0.75rem;
		font-size: 1.5rem;
		color: #333;
	}

	.tinymce-btn {
		height: 3rem;
		padding: 1rem 0;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.tinymce-btn button {
		border-radius: 0.375rem;
		padding: 0.5rem 2rem;
		font-weight: bold;
		background-color: #1DA0FB;
		color: #fff;
		border: #1DA0FB solid 0.0625rem;
		outline: none;
		box-shadow: var(--box-shadow1);
	}

	textarea {
		border-bottom-left-radius: 1rem;
		border-bottom-right-radius: 1rem;
	}

	/* 标签 */
	.el-tag+.el-tag {
		margin-left: 10px;
	}

	.button-new-tag {
		margin-left: 10px;
		height: 32px;
		line-height: 30px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.input-new-tag {
		width: 90px;
		margin-left: 10px;
		vertical-align: bottom;
	}

	.blod {
		font-weight: bold;
	}

	.red {
		color: red;
	}

	>>>.el-table,
	.el-table__expanded-cell {
		background-color: transparent;
	}

	>>>.el-table tr {
		background-color: transparent !important;
	}

	>>>.el-table--enable-row-transition .el-table__body td,
	.el-table .cell {
		background-color: transparent;
	}
	
	@media screen and (max-width: 480px) {
		.meal_wrap {
			display: none;
		}
	}
</style>
