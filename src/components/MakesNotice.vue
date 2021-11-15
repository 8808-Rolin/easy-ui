<template>
	<div>
		<el-table :data="tableData" stripe style="width: 100%">
			<el-table-column prop="date" label="类型" width="150">
			</el-table-column>
			<el-table-column prop="name" label="标题" width="400">
			</el-table-column>
			<el-table-column prop="date" label="发帖用户" width="150">
			</el-table-column>
			<el-table-column prop="date" label="回复数" width="120">
			</el-table-column>
			<el-table-column prop="date" label="最后回复时间" width="150">
			</el-table-column>
			<el-table-column prop="date" label="发布时间" width="150">
			</el-table-column>
		</el-table>

		<div style="margin-top: 0.625rem;">
			<Pagination></Pagination>
		</div>

		<el-divider></el-divider>

		<div class="meal_wrap">
			<div>
				<div class="title_makes_notice"><i class="el-icon-s-promotion"></i>&ensp;发表新帖</div>
				<div class="tinymce-btn">
					<button type="primary" @click="tinymceSave">发&emsp;表</button>
				</div>
			</div>
			<div class="title">
				<el-select v-model="value" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
				<el-input v-model="input" placeholder="请输入内容"></el-input>
			</div>
			<div class="tinymce-box">
				<TEditor ref="tinymceRef"></TEditor>
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

	export default {
		components: {
			TEditor,
			Pagination
		},
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				pText: null,
				html: null,
				options: [],
				value: '',
				input: '',

				// 标签
				dynamicTags: ['标签一', '标签二', '标签三'],
				inputVisible: false,
				inputValue: ''
			};
		},
		methods: {
			dutyDetailClick() {
				this.$nextTick(() => {
					let html =
						'<p><span style="color: rgb(224, 62, 45);" data-mce-style="color: #e03e2d;">1、方便；</span></p><p>2、快捷；</p>';
					if (!html) {
						html = '';
					}
					// 给富文本框赋值
					this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body')
						.innerHTML = html;
				});
			},

			tinymceClose() {
				// 清空富文本框
				this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body').innerHTML = '';
			},
			tinymceSave() {
				//富文本框保存获取值
				this.pText = this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelectorAll('p');
				this.html = this.$refs.tinymceRef.$el.querySelector('iframe').contentDocument.querySelector('body')
					.innerHTML;

			},

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
			}
		}
	};
</script>

<style>
	.meal_wrap>div:first-child {
		height: 4rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
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
	.el-tag + .el-tag {
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
</style>
