(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-617b248a"],{1288:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticStyle:{width:"100%"}},[i("HeaderHasSearch"),i("div",{staticClass:"main_box"},[i("Info"),i("div",{staticClass:"club"},[i("div",{staticClass:"club_mes"},[i("div",{staticClass:"club_logo"},[i("img",{attrs:{src:t.assImage(t.ass.assImage)}})]),i("div",{staticClass:"mes"},[i("div",{staticClass:"name"},[i("div",{staticClass:"club_name"},[i("strong",[t._v(t._s(t.ass.assName))])]),i("div",{staticClass:"join_club"},[i("el-button",{directives:[{name:"show",rawName:"v-show",value:0===t.permissionCode,expression:"permissionCode === 0"}],on:{click:t.joinAssociation}},[t._v("加入社团")]),i("el-button",{directives:[{name:"show",rawName:"v-show",value:2===t.permissionCode,expression:"permissionCode === 2"}],on:{click:t.toAdmin}},[t._v("社团管理")])],1)]),i("div",{staticClass:"club_superior"},[i("strong",[t._v("社团对接组织：")]),t._v(t._s(t.ass.assOrg)+"\n\t\t\t\t\t")]),i("div",{staticClass:"club_intro"},[i("small",[i("strong",[t._v("简介：")]),t._v(t._s(t.ass.assIntro))])])])]),i("div",{staticClass:"club_action"},[i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[i("span",[t._v("社团活动")])]),i("div",{directives:[{name:"show",rawName:"v-show",value:null===t.actionOverview,expression:"actionOverview === null"}],staticStyle:{"text-align":"center"}},[t._v("暂无数据")]),t._l(t.actionOverview,function(s){return i("div",{key:s.actid,staticClass:"text item",on:{click:function(i){t.centerDialogVisible=!0,t.getActionInfo(s.actid)}}},[i("a",{staticClass:"notice_title"},[i("strong",[t._v(t._s(s.title))])]),i("a",{staticStyle:{"text-align":"end"}},[i("small",{staticStyle:{width:"fit-content","white-space":"nowrap"}},[t._v(t._s(s.date))])])])})],2),i("el-dialog",{attrs:{title:t.dialogData.title,visible:t.centerDialogVisible,width:"30%",center:"","append-to-body":!0},on:{"update:visible":function(s){t.centerDialogVisible=s}}},[i("span",{domProps:{innerHTML:t._s(t.dialogData.content)}}),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(s){t.centerDialogVisible=!1}}},[t._v("取 消")]),i("el-button",{directives:[{name:"show",rawName:"v-show",value:2!==t.dialogData.status,expression:"dialogData.status !== 2"}],attrs:{type:"primary"},on:{click:function(s){return t.joinAction(t.centerDialogVisible)}}},[t._v("报 名")]),i("el-button",{directives:[{name:"show",rawName:"v-show",value:2===t.dialogData.status,expression:"dialogData.status === 2"}],attrs:{type:"primary",disabled:""}},[t._v("已报名")])],1)])],1)]),i("div",{staticClass:"notice_box"},[i("MakesNotice",{attrs:{permission:t.permissionCode,chaildPosts:t.posts,chaildFirstPosts:t.firstposts,total:t.code,aid:t.$route.params.aid,notisSize:t.notSize,tinymceId:"ctinymceId"}})],1),i("div",{staticStyle:{height:"1rem"}})],1)],1)},e=[],o=i("cebc"),n=i("bd86"),c=(i("4f37"),i("d078")),r=i("d2ac"),d=i("3048"),l=i("31e1"),u=i("2f62"),h={name:"Community",props:["chaildPosts","chaildFirstPosts","total","aid","notisSize","permission","tinymceId"],data:function(){return{permissionCode:0,ass:[],options:[{label:"社团公告",value:1}],actionOverview:[],posts:[],firstposts:[],code:0,page:1,limit:10,notSize:0,dialogData:{},centerDialogVisible:!1,message:null}},components:{HeaderHasSearch:c["a"],Info:r["a"],MakesNotice:d["a"]},methods:Object(n["a"])({getMassOrganization:function(){var t=this,s=this.uid,i=this.$route.params.aid;this.$api.getAssInformation({uid:s,aid:i}).then(function(s){t.permissionCode=s.data.data.permissionCode,t.ass=s.data.data.ass})},getActionOverview:function(){var t=this,s=this.uid,i=this.$route.params.aid;this.$api.getActionOverview({uid:s,aid:i}).then(function(s){t.actionOverview=s.data.data.action})},getFistPostList:function(t,s,i){var a=this,e=this.$route.params.aid;this.$api.getPostList({aid:e,type:t,page:s,limit:i}).then(function(t){a.posts=t.data.data.posts,a.code=t.data.data.code})},getPostList:function(t,s,i){var a=this,e=this.$route.params.aid;this.$api.getPostList({aid:e,type:t,page:s,limit:i}).then(function(t){a.firstposts=t.data.data.posts,a.notSize=t.data.data.code})},assImage:function(t){return"".concat(l["a"].sq).concat(t)},joinAssociation:function(){var t=this;this.$api.joinAssociation().then(function(s){t.firstposts=s.data.data.posts,t.notisSize=s.data.data.code,t.code=t.code+t.notisSize})},getActionInfo:function(t){var s=this,i=this.uid;this.$api.getActionInfo({actid:t,uid:i}).then(function(i){s.dialogData=i.data.data,s.dialogData.actid=t})},joinAction:function(t){null!==this.message&&this.message.close();var s=this.dialogData.status;0===s?this.participate():1===s&&(this.message=this.$message.error("你没有权限参加活动"),this.centerDialogVisible=!1)},participate:function(){var t=this,s=this.uid,i=this.dialogData.actid;this.$api.participate({uid:s,actid:i}).then(function(s){t.message=t.$message.success(s.data.data.msg),t.centerDialogVisible=!1})},toAdmin:function(){var t=this.$route.params.aid,s=this.user.studentID;window.location.href="".concat(l["a"].mq,"/dashboard?aid=").concat(t,"&studentID=").concat(s)}},"joinAssociation",function(){var t=this;null!==this.message&&this.message.close();var s=this.$route.params.aid,i=this.uid;this.$prompt("请输入备注","提示",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,40}$/,inputErrorMessage:"备注不能超过40个字且不能输入非法字符"}).then(function(a){var e=a.value;console.log(e,e.trim()),null===e||""===e.trim()?t.message=t.$message({type:"error",message:"备注不能为空"}):t.$api.joinAssociation({aid:s,uid:i,note:e.trim()}).then(function(s){t.message=t.$message({type:"success",message:s.data.data.msg})})}).catch(function(s){t.message="cancel"===s?t.$message({type:"info",message:"取消输入"}):t.$message({type:"error",message:s})})}),computed:Object(o["a"])({},Object(u["b"])({uid:function(t){return t.request.uid},user:function(t){return t.message.user}})),created:function(){this.getMassOrganization(),this.getActionOverview(),this.getFistPostList(2,this.page,this.limit),this.getPostList(1,this.page,this.limit)},mounted:function(){this.$bus.$on("cgetPostList",this.getPostList),this.$bus.$on("getFistPostList",this.getFistPostList)},beforeDestroy:function(){this.$bus.$off("cgetPostList"),this.$bus.$off("getFistPostList")}},m=h,g=(i("4647"),i("1720"),i("2877")),p=Object(g["a"])(m,a,e,!1,null,"062fbf79",null);s["default"]=p.exports},1720:function(t,s,i){"use strict";var a=i("28ed"),e=i.n(a);e.a},"28ed":function(t,s,i){},4647:function(t,s,i){"use strict";var a=i("8d61"),e=i.n(a);e.a},"4f37":function(t,s,i){"use strict";i("aa77")("trim",function(t){return function(){return t(this,3)}})},"8d61":function(t,s,i){}}]);
//# sourceMappingURL=chunk-617b248a.79c7c14d.js.map