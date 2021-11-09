<template>
	<div class="tinymce-editor">
		<Editor :id="tinymceId" :init="init" :disabled="disabled" v-model="myValue" @onClick="onClick"></Editor>
	</div>
</template>

<script>
	import axios from "axios";
	import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
	import Editor from '@tinymce/tinymce-vue' //编辑器引入
	import 'tinymce/themes/silver/theme' //编辑器主题
	import 'tinymce/icons/default'  //引入编辑器图标icon，不引入则不显示对应图标
	// 引入编辑器插件（基本免费插件都在这儿了）
	import 'tinymce/plugins/advlist' //高级列表
	import 'tinymce/plugins/autolink' //自动链接
	import 'tinymce/plugins/link' //超链接
	import 'tinymce/plugins/image' //插入编辑图片
	import 'tinymce/plugins/lists' //列表插件
	import 'tinymce/plugins/charmap' //特殊字符
	import 'tinymce/plugins/wordcount' // 字数统计

	const fonts = [
		"宋体=宋体",
		"微软雅黑=微软雅黑",
		"新宋体=新宋体",
		"黑体=黑体",
		"楷体=楷体",
		"隶书=隶书",
		"Courier New=courier new,courier",
		"AkrutiKndPadmini=Akpdmi-n",
		"Andale Mono=andale mono,times",
		"Arial=arial,helvetica,sans-serif",
		"Arial Black=arial black,avant garde",
		"Book Antiqua=book antiqua,palatino",
		"Comic Sans MS=comic sans ms,sans-serif",
		"Courier New=courier new,courier",
		"Georgia=georgia,palatino",
		"Helvetica=helvetica",
		"Impact=impact,chicago",
		"Symbol=symbol",
		"Tahoma=tahoma,arial,helvetica,sans-serif",
		"Terminal=terminal,monaco",
		"Times New Roman=times new roman,times",
		"Trebuchet MS=trebuchet ms,geneva",
		"Verdana=verdana,geneva",
		"Webdings=webdings",
		"Wingdings=wingdings,zapf dingbats"
	];
	export default {
		components: {
			Editor
		},
		props: {
			//内容
			value: {
				type: String,
				default: ''
			},
			//是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			//插件
			plugins: {
				type: [String, Array],
				default: 'advlist autolink link image lists charmap wordcount'
			},
			//工具栏
			toolbar: {
				type: [String, Array],
				default: 'undo redo |  formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image table'
			}
		},
		data() {
			return {
				//初始化配置
				tinymceId: 'tinymce',
				myValue: this.value,
				init: {
					selector: '#tinymce',
					language_url: '/tinymce/langs/zh_CN.js', //汉化路径是自定义的，一般放在public或static里面
					language: 'zh_CN',
					skin_url: '/tinymce/skins/ui/oxide', //皮肤
					plugins: this.plugins, //插件
					//工具栏
					toolbar: this.toolbar,
					toolbar_location: '/',
					fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
					font_formats: fonts.join(";"),

					height: 500, //高度
					placeholder: '在这里输入文字',
					height: 500,
					menubar: true, // 最上方menu菜单的显示隐藏
					toolbar_drawer: true,
					statusbar: false, // 隐藏编辑器底部的状态栏
					elementpath: false, //禁用下角的当前标签路径

					branding: false, //隐藏右下角技术支持
					//图片上传
					images_upload_handler: function(blobInfo, success, failure) {
						let reader = new FileReader();
						let size = Math.floor(blobInfo.blob().size / 1024);
						if (size > 1024) {
							failure('请选择1M以内的图片！')
						} else {
							reader.readAsDataURL(blobInfo.blob())
							reader.onload = function() {
								console.log(this);
								success(this.result);
							}
						}
					},
					// 文件上传
					// file_picker_types: 'file image media', // 指定允许上传的类型
					file_picker_types: 'file', // 指定允许上传的类型
					file_picker_callback: function(callback, value, meta) {
					  console.log(meta.filetype)
					  console.log(343434)
					  // // 要先模拟出一个input用于上传本地文件
					  var input = document.createElement('input')
					  input.setAttribute('type', 'file')
					  // 你可以给input加accept属性来限制上传的文件类型
					  // 例如：input.setAttribute('accept', '.jpg,.png')
					  input.setAttribute('accept', '.doc,.docx,.ppt,.pptx,.pdf,.xlsx')
					  input.click()
					  input.onchange = function() {
					    var file = this.files[0]
					    console.log(this.files)
					    console.log(file)
					    console.log(file.name)
					    // 下方被注释掉的是官方的一个例子
					    // 放到下面给大家参考
					    var reader = new FileReader()
					    reader.onload = function() {
					      console.log(window.tinymce)
					      // Note: Now we need to register the blob in TinyMCEs image blob
					      // registry. In the next release this part hopefully won't be
					      // necessary, as we are looking to handle it internally.
					      var id = 'blobid' + (new Date()).getTime()
					      var blobCache = window.tinymce.activeEditor.editorUpload.blobCache
					      var base64 = reader.result.split(',')[1]
					      var blobInfo = blobCache.create(id, file, base64)
					      console.log(id)
					      console.log(file)
					      console.log(base64)
					      console.log(file.name)
					      console.log(blobInfo)
					      console.log(blobInfo.blobUri())
					      blobCache.add(blobInfo)
					
					      // call the callback and populate the Title field with the file name
					      callback(blobInfo.blobUri(), { text: file.name, title: file.name })
					    }
					    reader.readAsDataURL(file)
					  }
					}
				}
			}
		},
		watch: {
			//监听内容变化
			value(newValue) {
				this.myValue = (newValue == null ? '' : newValue)
			},
			myValue(newValue) {
				if (this.triggerChange) {
					this.$emit('change', newValue)
				} else {
					this.$emit('input', newValue)
				}
			}
		},
		mounted() {
			tinymce.init({})
			// console.log(this.toolbar,'======')
		},
		methods: {
			onClick(e) {
				this.$emit('onClick', e, tinymce)
			},
			//可以添加一些自己的自定义事件，如清空内容
			clear() {
				this.myValue = ''
			},
		}
	}
</script>
