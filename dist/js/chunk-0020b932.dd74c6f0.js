(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0020b932"],{"0418":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",[i("div",{staticClass:"warp"},[i("div",{staticClass:"logo"},[i("router-link",{attrs:{to:{path:"/"},title:"Easy社团"}},[t._v("Easy社团")])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.existUser,expression:"existUser"}],staticClass:"user"},[i("div",{staticClass:"profile",on:{click:t.toMyHomePage}},[i("img",{attrs:{src:t.headImage}})]),i("el-dropdown",[i("span",{staticClass:"el-dropdown-link"},[i("div",{staticStyle:{color:"#000000",cursor:"pointer"}},[t._v(t._s(t.user.userName))]),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{nativeOn:{click:function(e){t.centerDialogVisible=!0}}},[t._v("发送邮件")]),i("el-dropdown-item",{nativeOn:{click:function(e){return t.toMyHomePage(e)}}},[t._v("个人空间")]),i("el-dropdown-item",{nativeOn:{click:function(e){return t.logout(e)}}},[t._v("退出登录")])],1)],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.existUser,expression:"!existUser"}],staticClass:"login_and_register"},[i("router-link",{attrs:{to:{path:"/login"}}},[t._v("登录")]),i("router-link",{attrs:{to:{path:"/register"}}},[t._v("注册")])],1)]),i("el-dialog",{attrs:{title:"发送邮件",visible:t.centerDialogVisible,width:"61.8%",center:"","append-to-body":!0},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("span",[i("div",{staticClass:"form"},[i("div",{staticClass:"title"},[i("label",[t._v("邮件标题：")]),i("el-input",{attrs:{maxlength:"120","show-word-limit":"",placeholder:"请输入邮件标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("div",{staticClass:"content"},[i("el-input",{attrs:{type:"textarea",maxlength:"255",rows:10,placeholder:"请输入私信内容","show-word-limit":""},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),i("div",{staticClass:"to_man"},[i("div",{staticClass:"to_man_tag"},[i("label",[t._v("收件人：")]),i("el-tag",{directives:[{name:"show",rawName:"v-show",value:""!=t.toManTag,expression:"toManTag != ''"}],attrs:{closable:"","disable-transitions":!1,size:"small"},on:{close:function(e){return t.removeToManTag(t.toManTag)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.toManTag.tag)+"\n\t\t\t\t\t\t")])],1),i("div",{staticClass:"search_man"},[i("el-input",{attrs:{placeholder:"请输入收件人的名称/昵称/电话号码/学号..."},on:{input:t.findUser},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),i("div",t._l(t.dynamicTags,function(e,a){return i("el-tag",{key:a,attrs:{"disable-transitions":!1,size:"medium"},on:{click:function(i){return t.handleClose(e)}}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.tag)+"\n\t\t\t\t\t\t\t")])}),1)],1)])])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.sendMail}},[t._v("确 定")])],1)])],1)},s=[],n=i("cebc"),o=(i("7f7f"),i("0cd8"),i("57e7"),i("e988")),r=i("cadb"),l=i("2f62"),c=i("31e1"),u={name:"Header",data:function(){return{centerDialogVisible:!1,title:"",input:"",keyword:"",dynamicTags:[],inputVisible:!1,inputValue:"",toManTag:"",timeout:null,message:null}},methods:{logout:function(){console.log("退出登录处理....."),this.$store.commit("removeUser",""),o["a"].removeItem("token"),this.$store.commit("updateExistUser",!1),this.$router.push({path:"/login"})},checkLogin:function(){var t=this,e=o["a"].getItem("token");if(null!==e){this.$store.commit("updateToken",e.token),this.$store.commit("updateUid",e.uid);var i=this.$store.state.message.user;""===i.headImage||void 0===i.headImage||null===i.headImage?this.$api.getCommonPersonInformation({uid:e.uid}).then(function(e){e.data.data.code||(t.$store.commit("addUser",e.data.data.user),t.$store.commit("updateExistUser",!0),t.$store.commit("addOlineTime",r["a"].formatDate))}):this.$store.commit("updateExistUser",!0)}else this.$store.commit("updateExistUser",!1)},toMyHomePage:function(){this.$router.push({name:"Me",params:{uid:this.uid}})},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1),""!=this.toManTag&&this.dynamicTags.push(this.toManTag),this.toManTag=t},removeToManTag:function(t){this.toManTag="",this.dynamicTags.push(t)},findUser:function(){var t=this,e=this.keyword;clearTimeout(this.timeout),this.timeout=setTimeout(function(){console.log(e,"====="),""!=e&&t.$api.findUser({keyword:e}).then(function(e){var i=e.data.data.msg.reduce(function(t,e){var i={uid:e.uid,tag:"".concat(e.name,"(").concat(e.student_number,")")};return t.push(i),t},[]);t.dynamicTags=i})},500)},sendMail:function(){var t=this;null!==this.message&&this.message.close();var e=0,i=0,a=this.uid,s=this.toManTag.uid,n=this.title,o=this.input,r=void 0!==s&&""!==n&&""!==o;r?this.$api.sendEmail({isSystem:e,mailType:i,fromuid:a,touid:s,title:n,content:o}).then(function(e){e.data.data.code>-1?(t.input="",t.title="",t.toManTag="",t.dynamicTags=[],t.keyword="",t.centerDialogVisible=!1,t.message=t.$message.success(e.data.data.msg)):t.message=t.$message.error(e.data.data.msg)}):this.message=this.$message.error("请完善数据")}},computed:Object(n["a"])({},Object(l["b"])({user:function(t){return t.message.user},existUser:function(t){return t.message.existUser},uid:function(t){return t.request.uid}}),{headImage:function(){return"".concat(c["a"].sq).concat(this.user.headImage)}}),created:function(){this.checkLogin()}},d=u,m=(i("da0e"),i("2877")),h=Object(m["a"])(d,a,s,!1,null,"33193219",null);e["a"]=h.exports},"0cd8":function(t,e,i){"use strict";var a=i("5ca1"),s=i("7b23");a(a.P+a.F*!i("2f21")([].reduce,!0),"Array",{reduce:function(t){return s(this,t,arguments.length,arguments[1],!1)}})},"4b0b":function(t,e,i){"use strict";var a=i("54a4"),s=i.n(a);s.a},5051:function(t,e,i){"use strict";var a=i("f4aa"),s=i.n(a);s.a},"54a4":function(t,e,i){},"7b23":function(t,e,i){var a=i("d8e8"),s=i("4bf8"),n=i("626a"),o=i("9def");t.exports=function(t,e,i,r,l){a(e);var c=s(t),u=n(c),d=o(c.length),m=l?d-1:0,h=l?-1:1;if(i<2)for(;;){if(m in u){r=u[m],m+=h;break}if(m+=h,l?m<0:d<=m)throw TypeError("Reduce of empty array with no initial value")}for(;l?m>=0:d>m;m+=h)m in u&&(r=e(r,u[m],m,c));return r}},ad1b:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"seach"}},[i("Header"),i("div",{staticClass:"main_box"},[i("div",{staticClass:"search_box"},[i("div",{staticClass:"logo"}),i("div",{staticClass:"search"},[i("el-input",{attrs:{placeholder:"请输入内容"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.toChild()}},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}},[i("el-switch",{attrs:{slot:"prepend","active-text":"用户","active-value":1,"inactive-value":0,"inactive-text":"帖子"},slot:"prepend",model:{value:t.value,callback:function(e){t.value=e},expression:"value"}}),i("el-button",{attrs:{slot:"append",icon:"el-icon-search"},on:{click:t.toChild},slot:"append"})],1)],1)]),i("div",{staticClass:"result_box"},[i("transition",{staticClass:"result_box",attrs:{name:"transitionName",mode:"out-in"}},[i("router-view",{staticClass:"router",attrs:{type:t.value}})],1)],1),i("div",{staticStyle:{height:"1rem"}})])],1)},s=[],n=(i("7f7f"),i("0418")),o={name:"Search",props:["type"],data:function(){return{value:0,input:"",transitionName:"slide-right"}},components:{Header:n["a"]},watch:{$route:function(t,e){var i=this.$router.isBack;this.transitionName=i?"slide-right":"slide-left",this.$router.isBack=!1}},methods:{toChild:function(t){console.log(this.value,this.input),0===this.value&&""!==this.input?(this.$router.push({name:"Posts",params:{content:this.input}}),this.$bus.$emit("search")):1===this.value&&(this.$router.push({name:"User",params:{content:this.input}}),this.$bus.$emit("search"))}},beforeMount:function(){"User"===this.$route.name?this.value=1:this.value=0}},r=o,l=(i("5051"),i("4b0b"),i("2877")),c=Object(l["a"])(r,a,s,!1,null,"5b5283ae",null);e["default"]=c.exports},da0e:function(t,e,i){"use strict";var a=i("e4a8"),s=i.n(a);s.a},e4a8:function(t,e,i){},f4aa:function(t,e,i){}}]);
//# sourceMappingURL=chunk-0020b932.dd74c6f0.js.map