(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7385df34"],{"0418":function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("header",[i("div",{staticClass:"warp"},[i("div",{staticClass:"logo"},[i("router-link",{attrs:{to:{path:"/"},title:"Easy社团"}},[t._v("Easy社团")])],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.existUser,expression:"existUser"}],staticClass:"user"},[i("div",{staticClass:"profile",on:{click:t.toMyHomePage}},[i("img",{attrs:{src:t.headImage}})]),i("el-dropdown",[i("span",{staticClass:"el-dropdown-link"},[i("div",{staticStyle:{color:"#000000",cursor:"pointer"}},[t._v(t._s(t.user.userName))]),i("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),i("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[i("el-dropdown-item",{nativeOn:{click:function(e){t.centerDialogVisible=!0}}},[t._v("发送邮件")]),i("el-dropdown-item",{nativeOn:{click:function(e){return t.toMyHomePage(e)}}},[t._v("个人空间")]),i("el-dropdown-item",{nativeOn:{click:function(e){return t.logout(e)}}},[t._v("退出登录")])],1)],1)],1),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.existUser,expression:"!existUser"}],staticClass:"login_and_register"},[i("router-link",{attrs:{to:{path:"/login"}}},[t._v("登录")]),i("router-link",{attrs:{to:{path:"/register"}}},[t._v("注册")])],1)]),i("el-dialog",{attrs:{title:"发送邮件",visible:t.centerDialogVisible,width:"61.8%",center:"","append-to-body":!0},on:{"update:visible":function(e){t.centerDialogVisible=e}}},[i("span",[i("div",{staticClass:"form"},[i("div",{staticClass:"title"},[i("label",[t._v("邮件标题：")]),i("el-input",{attrs:{maxlength:"120","show-word-limit":"",placeholder:"请输入邮件标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),i("div",{staticClass:"content"},[i("el-input",{attrs:{type:"textarea",maxlength:"255",rows:10,placeholder:"请输入私信内容","show-word-limit":""},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1),i("div",{staticClass:"to_man"},[i("div",{staticClass:"to_man_tag"},[i("label",[t._v("收件人：")]),i("el-tag",{directives:[{name:"show",rawName:"v-show",value:""!=t.toManTag,expression:"toManTag != ''"}],attrs:{closable:"","disable-transitions":!1,size:"small"},on:{close:function(e){return t.removeToManTag(t.toManTag)}}},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.toManTag.tag)+"\n\t\t\t\t\t\t")])],1),i("div",{staticClass:"search_man"},[i("el-input",{attrs:{placeholder:"请输入收件人的名称/昵称/电话号码/学号..."},on:{input:t.findUser},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}}),i("div",t._l(t.dynamicTags,function(e,a){return i("el-tag",{key:a,attrs:{"disable-transitions":!1,size:"medium"},on:{click:function(i){return t.handleClose(e)}}},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(e.tag)+"\n\t\t\t\t\t\t\t")])}),1)],1)])])]),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(e){t.centerDialogVisible=!1}}},[t._v("取 消")]),i("el-button",{attrs:{type:"primary"},on:{click:t.sendMail}},[t._v("确 定")])],1)])],1)},s=[],n=i("cebc"),o=(i("7f7f"),i("0cd8"),i("57e7"),i("e988")),r=i("cadb"),c=i("2f62"),l=i("31e1"),u={name:"Header",data:function(){return{centerDialogVisible:!1,title:"",input:"",keyword:"",dynamicTags:[],inputVisible:!1,inputValue:"",toManTag:"",timeout:null,message:null}},methods:{logout:function(){console.log("退出登录处理....."),this.$store.commit("removeUser",""),o["a"].removeItem("token"),this.$store.commit("updateExistUser",!1),this.$router.push({path:"/login"})},checkLogin:function(){var t=this,e=o["a"].getItem("token");if(null!==e){this.$store.commit("updateToken",e.token),this.$store.commit("updateUid",e.uid);var i=this.$store.state.message.user;""===i.headImage||void 0===i.headImage||null===i.headImage?this.$api.getCommonPersonInformation({uid:e.uid}).then(function(e){e.data.data.code||(t.$store.commit("addUser",e.data.data.user),t.$store.commit("updateExistUser",!0),t.$store.commit("addOlineTime",r["a"].formatDate))}):this.$store.commit("updateExistUser",!0)}else this.$store.commit("updateExistUser",!1)},toMyHomePage:function(){this.$router.push({name:"Me",params:{uid:this.uid}})},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1),""!=this.toManTag&&this.dynamicTags.push(this.toManTag),this.toManTag=t},removeToManTag:function(t){this.toManTag="",this.dynamicTags.push(t)},findUser:function(){var t=this,e=this.keyword;clearTimeout(this.timeout),this.timeout=setTimeout(function(){console.log(e,"====="),""!=e&&t.$api.findUser({keyword:e}).then(function(e){var i=e.data.data.msg.reduce(function(t,e){var i={uid:e.uid,tag:"".concat(e.name,"(").concat(e.student_number,")")};return t.push(i),t},[]);t.dynamicTags=i})},500)},sendMail:function(){var t=this;null!==this.message&&this.message.close();var e=0,i=0,a=this.uid,s=this.toManTag.uid,n=this.title,o=this.input,r=void 0!==s&&""!==n&&""!==o;r?this.$api.sendEmail({isSystem:e,mailType:i,fromuid:a,touid:s,title:n,content:o}).then(function(e){e.data.data.code>-1?(t.input="",t.title="",t.toManTag="",t.dynamicTags=[],t.keyword="",t.centerDialogVisible=!1,t.message=t.$message.success(e.data.data.msg)):t.message=t.$message.error(e.data.data.msg)}):this.message=this.$message.error("请完善数据")}},computed:Object(n["a"])({},Object(c["b"])({user:function(t){return t.message.user},existUser:function(t){return t.message.existUser},uid:function(t){return t.request.uid}}),{headImage:function(){return"".concat(l["a"].sq).concat(this.user.headImage)}}),created:function(){this.checkLogin()}},d=u,m=(i("af02"),i("2877")),h=Object(m["a"])(d,a,s,!1,null,"67801dd2",null);e["a"]=h.exports},"0487":function(t,e,i){},"0745":function(t,e,i){},"0cd8":function(t,e,i){"use strict";var a=i("5ca1"),s=i("7b23");a(a.P+a.F*!i("2f21")([].reduce,!0),"Array",{reduce:function(t){return s(this,t,arguments.length,arguments[1],!1)}})},"29bf":function(t,e,i){},"5d61":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Header"),i("div",{staticClass:"main_box"},[i("div",{staticClass:"mes_box"},[i("router-view")],1),i("div",{staticStyle:{height:"1rem"}})])],1)},s=[],n=i("0418"),o={name:"HomePage",data:function(){return{centerDialogVisible3:!1,title:"",input:""}},components:{Header:n["a"]}},r=o,c=(i("ce16"),i("f691"),i("2877")),l=Object(c["a"])(r,a,s,!1,null,"5abd905a",null);e["default"]=l.exports},"7b23":function(t,e,i){var a=i("d8e8"),s=i("4bf8"),n=i("626a"),o=i("9def");t.exports=function(t,e,i,r,c){a(e);var l=s(t),u=n(l),d=o(l.length),m=c?d-1:0,h=c?-1:1;if(i<2)for(;;){if(m in u){r=u[m],m+=h;break}if(m+=h,c?m<0:d<=m)throw TypeError("Reduce of empty array with no initial value")}for(;c?m>=0:d>m;m+=h)m in u&&(r=e(r,u[m],m,l));return r}},af02:function(t,e,i){"use strict";var a=i("29bf"),s=i.n(a);s.a},ce16:function(t,e,i){"use strict";var a=i("0487"),s=i.n(a);s.a},f691:function(t,e,i){"use strict";var a=i("0745"),s=i.n(a);s.a}}]);
//# sourceMappingURL=chunk-7385df34.2f6cf5ef.js.map