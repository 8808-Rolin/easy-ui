(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1d146137"],{"07b6":function(t,e,s){},"0d49":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"posts_box"},[s("div",{directives:[{name:"show",rawName:"v-show",value:0==t.posts.length,expression:"posts.length == 0"}],staticStyle:{"text-align":"center"}},[t._v("尚未发帖")]),t._l(t.posts,function(e,a){return s("div",{key:e.pid,staticClass:"post"},[s("div",{staticClass:"post_top"},[s("div",{staticClass:"logo",on:{click:function(s){return t.toPublicAndCommunity(e.aid)}}},[s("img",{attrs:{src:t.postImage(e.aimage)}})]),s("div",{staticClass:"name"},[s("div",{on:{click:function(s){return t.toPublicAndCommunity(e.aid)}}},[t._v(t._s(e.aname))]),s("div",{staticClass:"title",on:{click:function(s){return t.toP(e.aid,e.pid)}}},[s("strong",[t._v(t._s(e.title))])])])]),s("div",{staticClass:"post_bottom"},[s("small",[t._v("回复数："+t._s(e.replies))]),t._v("\n\t\t\t\t \n\t\t\t\t"),s("small",[t._v("发布日期："+t._s(e.date))])])])})],2)])},i=[],n=s("1799"),o=s("31e1"),c={name:"Posts",data:function(){return{posts:[]}},components:{Pagination:n["a"]},methods:{postImage:function(t){return"".concat(o["a"].sq).concat(t)},toPublicAndCommunity:function(t){t>0?this.$router.push({name:"Community",params:{aid:t}}):this.$router.push({path:"/public"})},toP:function(t,e){this.$router.push({name:"PublicCommunity",params:{aid:t,pid:e}})},getPosts:function(){var t=this,e=0,s=this.$route.params.uid;this.$api.getPosts({type:e,"zone-uid":s}).then(function(e){t.posts=e.data.data.posts.reverse(),console.log(e.data.data)})}},beforeMount:function(){console.log("挂载posts"),this.getPosts()},destroyed:function(){console.log("销毁posts")}},r=c,l=(s("5c8b"),s("220d"),s("2877")),u=Object(l["a"])(r,a,i,!1,null,"6a17e3a0",null);e["a"]=u.exports},"103d":function(t,e,s){t.exports=s.p+"img/logo-zhen-500px.ac5e4ee8.png"},"181d":function(t,e,s){},1974:function(t,e,s){},"220d":function(t,e,s){"use strict";var a=s("b590"),i=s.n(a);i.a},3332:function(t,e,s){"use strict";var a=s("1974"),i=s.n(a);i.a},"44bb":function(t,e,s){},4852:function(t,e,s){"use strict";var a=s("bf0b4"),i=s.n(a);i.a},5086:function(t,e,s){"use strict";var a=s("44bb"),i=s.n(a);i.a},"5c8b":function(t,e,s){"use strict";var a=s("181d"),i=s.n(a);i.a},"64c4":function(t,e,s){},"752e":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"clubs"},t._l(t.ass,function(e,a){return s("div",{key:e.aid,staticClass:"club"},[s("div",{staticClass:"logo",on:{click:function(s){return t.toCommunity(e.aid)}}},[s("img",{attrs:{src:t.assImage(e.profile)}})]),s("el-tooltip",{attrs:{content:e.name,placement:"bottom","open-delay":500}},[s("div",{staticClass:"name",on:{click:function(s){return t.toCommunity(e.aid)}}},[t._v(t._s(e.name))])])],1)}),0)])},i=[],n=s("31e1"),o={name:"MyClub",props:["ass"],data:function(){return{}},methods:{assImage:function(t){return"".concat(n["a"].sq).concat(t)},toCommunity:function(t){this.$router.push({name:"Community",params:{aid:t}})}}},c=o,r=(s("8d4a"),s("5086"),s("2877")),l=Object(r["a"])(c,a,i,!1,null,"49838617",null);e["a"]=l.exports},"8d4a":function(t,e,s){"use strict";var a=s("07b6"),i=s.n(a);i.a},9844:function(t,e,s){},b590:function(t,e,s){},bf0b4:function(t,e,s){},da5b:function(t,e,s){"use strict";var a=s("64c4"),i=s.n(a);i.a},dacc:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.status,expression:"status === 0"}]},[s("div",{staticClass:"info"},[s("div",{staticClass:"title"},[s("span",{directives:[{name:"show",rawName:"v-show",value:0===t.status,expression:"status === 0"}]},[s("strong",[t._v("我的信息")])]),s("el-button",{directives:[{name:"show",rawName:"v-show",value:0===t.status,expression:"status === 0"}],attrs:{type:"text",icon:"el-icon-camera"},on:{click:function(e){return t.updateUser("头像")}}},[t._v("修改头像\n\t\t\t\t")])],1),s("p",{staticStyle:{cursor:"default"}},[t._v("手机号码 "),s("span",[t._v(t._s(t.user.phone))])]),s("el-tooltip",{attrs:{content:t.user.email,placement:"top","open-delay":500}},[s("p",{on:{click:function(e){return t.updateUser("电子邮箱")}}},[t._v("电子邮箱 "),s("span",[t._v(t._s(t.user.email))])])]),s("p",{staticStyle:{cursor:"default"}},[t._v("所属院系 "),s("span",[t._v(t._s(t.user.college))])]),s("p",{on:{click:function(e){return t.updateUser("生日")}}},[t._v("生  日 "),s("span",[t._v(t._s(t.user.birth))])]),s("p",{staticStyle:{cursor:"default"}},[t._v("发帖数量 "),s("span",[t._v(t._s(t.user.numpost))])])],1),s("div",{staticClass:"notice"},[t._m(0),s("div",{staticClass:"item_box"},[s("el-input",{class:{notice_text:0===t.status},attrs:{debounce:500,readonly:0!==t.status,autosize:"",type:"textarea",placeholder:"请输入内容"},on:{blur:t.updateNotice},model:{value:t.user.notice,callback:function(e){t.$set(t.user,"notice",e)},expression:"user.notice"}})],1)]),s("el-dialog",{attrs:{title:"修改我的信息",visible:t.centerDialogVisibleDate,width:"30%","append-to-body":!0},on:{"update:visible":function(e){t.centerDialogVisibleDate=e}}},[s("div",[s("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期",format:"yyyy-MM-dd","value-format":"yyyy-MM-dd"},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),s("span",{staticClass:"dialog-footer",staticStyle:{display:"flex","justify-content":"center"},attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.centerDialogVisibleDate=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.updateBirth}},[t._v("修改")])],1)]),s("el-dialog",{attrs:{title:"修改我的信息",visible:t.centerDialogVisibleImage,width:"30%",center:"","append-to-body":!0},on:{"update:visible":function(e){t.centerDialogVisibleImage=e}}},[s("div",{staticStyle:{"text-align":"center"}},[s("el-upload",{staticClass:"avatar-uploader",attrs:{action:"#","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload,"http-request":t.HttpRequest}},[t.imageBASE64?s("img",{staticClass:"avatar",attrs:{src:t.imageBASE64}}):s("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.centerDialogVisibleImage=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.updateImage}},[t._v("修改")])],1)])],1),s("div",{directives:[{name:"show",rawName:"v-show",value:0!==t.status,expression:"status !== 0"}]},[s("div",{staticClass:"info"},[s("div",{staticClass:"title"},[s("span",{directives:[{name:"show",rawName:"v-show",value:0!==t.status,expression:"status !== 0"}]},[s("strong",[t._v("他的信息")])]),s("el-button",{directives:[{name:"show",rawName:"v-show",value:0!==t.status,expression:"status !== 0"}],attrs:{type:"text",icon:"el-icon-message"},on:{click:function(e){t.centerDialogVisible2=!0}}},[t._v("发送私信")])],1),s("p",[t._v("手机号码："),s("span",[t._v(t._s(t.user.phone))])]),s("el-tooltip",{attrs:{content:t.user.email,placement:"top","open-delay":500}},[s("p",[t._v("电子邮箱："),s("span",[t._v(t._s(t.user.email))])])]),s("p",[t._v("所属院系："),s("span",[t._v(t._s(t.user.college))])]),s("p",[t._v("生  日："),s("span",[t._v(t._s(t.user.birth))])]),s("p",[t._v("发帖数量："),s("span",[t._v(t._s(t.user.numpost))])])],1),s("div",{staticClass:"notice"},[t._m(1),s("div",{staticClass:"item_box"},[s("el-input",{class:{notice_text:0===t.status},attrs:{debounce:500,readonly:0!==t.status,autosize:"",type:"textarea",placeholder:"请输入内容"},on:{blur:t.updateNotice},model:{value:t.user.notice,callback:function(e){t.$set(t.user,"notice",e)},expression:"user.notice"}})],1)]),s("el-dialog",{attrs:{title:"发送私信",visible:t.centerDialogVisible2,width:"30%",center:"","append-to-body":!0},on:{"update:visible":function(e){t.centerDialogVisible2=e}}},[s("div",{staticClass:"form"},[s("div",[s("label",[t._v("私信标题：")]),s("el-input",{attrs:{maxlength:"120","show-word-limit":"",placeholder:"请输入内容"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),s("div",[s("el-input",{attrs:{type:"textarea",maxlength:"255",rows:10,placeholder:"请输入私信内容","show-word-limit":""},model:{value:t.input,callback:function(e){t.input=e},expression:"input"}})],1)]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.centerDialogVisible2=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.sendEmail}},[t._v("发送")])],1)])],1)])},i=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"title"},[s("strong",[t._v("公告")])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"title"},[s("strong",[t._v("公告")])])}],n=s("cebc"),o=(s("57e7"),s("bd86")),c=s("751a"),r=s("31e1"),l=s("4328"),u=s.n(l),d=s("2f62"),p={name:"PersonalInfo",props:["user","status"],data:function(){var t;return t={change:!1,content:""},Object(o["a"])(t,"change",!1),Object(o["a"])(t,"message",null),Object(o["a"])(t,"centerDialogVisible2",!1),Object(o["a"])(t,"centerDialogVisibleImage",!1),Object(o["a"])(t,"centerDialogVisibleDate",!1),Object(o["a"])(t,"input",""),Object(o["a"])(t,"title",""),Object(o["a"])(t,"imageUrl",""),Object(o["a"])(t,"value","asda"),Object(o["a"])(t,"date",""),Object(o["a"])(t,"imageBASE64",""),t},methods:{updateNotice:function(){var t=this;null!==this.message&&this.message.close();var e=this.user.notice,s=this.user.uid;0===this.status&&this.change&&this.$api.updateNotice({newProfile:e,uid:s}).then(function(e){t.message=t.$message.success(e.data.data.msg),t.content="",t.change=!1})},updateUser:function(t){var e=this;null!==this.message&&this.message.close();var s=["昵称","简介","头像","电子邮箱","生日"],a=["update-name","update-intro","update-profile","update-email","update-birth"],i=["name","intro","profile","email","birth"],n="",o="";"电子邮箱"===t?(n=/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,o="邮箱格式不正确"):(n=/[^\s]/,o="不能输入空字符串");var l=s.indexOf(t),d=a[l],p=this.user.uid;console.log(d,p),"头像"===t?this.centerDialogVisibleImage=!0:"生日"===t?this.centerDialogVisibleDate=!0:this.$prompt("请输入".concat(t),"修改我的信息",{confirmButtonText:"确定",cancelButtonText:"取消",inputPattern:n,inputErrorMessage:o}).then(function(t){var s=t.value,a=s,n={uid:p,newProfile:a};console.log(n),c["a"].post("".concat(r["a"].sq,"/api/zone/").concat(d),u.a.stringify(n)).then(function(t){console.log(t.data.data),0===t.data.data.code?(e.message=e.$message({type:"success",message:t.data.data.msg}),e.updateVuexUser(p),e.user[i[l]]=a):e.message=e.$message({type:"success",message:t.data.data.msg})})}).catch(function(t){console.log(t),"cancel"===t?console.log("取消输入"):e.message=e.$message({type:"error",message:t})})},beforeAvatarUpload:function(t){var e=this,s="image/jpeg"===t.type||"image/png"===t.type,a=t.size/1024/1024<2;if(s&&a){var i=new FileReader;i.readAsDataURL(t),i.onload=function(){e.imageBASE64=i.result}}else s||this.$message.error("上传头像图片只能是 JPG 或 PNG 格式!"),a||this.$message.error("上传头像图片大小不能超过 2MB!");return!1},HttpRequest:function(t){console.log(t)},handleAvatarSuccess:function(t,e){console.log(t)},updateImage:function(){var t=this;null!==this.message&&this.message.close();var e=this.user.uid,s=this.imageBASE64;""!==s?this.$api.uploadImage({imageBASE64:s}).then(function(s){if(0===s.data.data.code){t.imageUrl=s.data.data.msg;var a=t.imageUrl;t.$api.updateProfile({uid:e,newProfile:a}).then(function(s){t.$message.success(s.data.data.msg),t.updateVuexUser(e),t.centerDialogVisibleImage=!1,t.imageBASE64=""})}else t.$message.error(s.data.data.msg)}):this.message=this.$message.error("请先选择图片")},updateBirth:function(){var t=this,e=this.user.uid,s=this.date;this.$api.updateBirth({uid:e,newProfile:s}).then(function(e){0===e.data.data.code?(t.user.birth=s,t.$message.success(e.data.data.msg),t.centerDialogVisibleDate=!1):t.$message.error(e.data.data.msg)})},updateVuexUser:function(t){var e=this;this.$api.getCommonPersonInformation({uid:t}).then(function(t){t.data.data.code||e.$store.commit("addUser",t.data.data.user)})},sendEmail:function(){var t=this;null!==this.message&&this.message.close();var e=0,s=0,a=this.myUid,i=this.$route.params.uid,n=this.title,o=this.input;this.$api.sendEmail({isSystem:e,mailType:s,fromuid:a,touid:i,title:n,content:o}).then(function(e){e.data.data.code>-1?(t.message=t.$message.success(e.data.data.msg),t.centerDialogVisible2=!1,t.title="",t.input=""):t.message=t.$message.error(e.data.data.msg)})}},computed:Object(n["a"])({notice:function(){return this.user.notice}},Object(d["b"])({myUid:function(t){return t.request.uid}})),watch:{notice:function(t,e){""===this.content&&(this.content=void 0!==e?e:t),this.content===this.user.notice?this.change=!1:this.change=!0}},mounted:function(){this.$bus.$on("updateUser",this.updateUser)},beforeDestroy:function(){this.$bus.$off("updateUser")}},m=p,v=(s("4852"),s("3332"),s("2877")),g=Object(v["a"])(m,a,i,!1,null,"517ac4f5",null);e["a"]=g.exports},e197:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"posts_box"},[0==t.myColl.length?s("div",{staticStyle:{"text-align":"center"}},[t._v("尚未收藏")]):t._e(),t._l(t.myColl,function(e,a){return s("div",{key:e.pid,staticClass:"post"},[s("div",{staticClass:"post_top"},[s("div",{staticClass:"logo",on:{click:function(s){return t.toPublicAndCommunity(e.aid)}}},[s("img",{attrs:{src:t.postImage(e.aimage)}})]),s("div",{staticClass:"name"},[s("div",{on:{click:function(s){return t.toPublicAndCommunity(e.aid)}}},[t._v(t._s(e.aname))]),s("div",{on:{click:function(s){return t.toP(e.aid,e.pid)}}},[s("strong",[t._v(t._s(e.title))])])])]),s("div",{staticClass:"post_bottom"},[s("small",[t._v("回复数："+t._s(e.replies))]),t._v("\n\t\t\t\t \n\t\t\t\t"),s("small",[t._v("发布日期："+t._s(e.date))])])])})],2)])},i=[],n=s("1799"),o=s("31e1"),c={name:"Collection",data:function(){return{myColl:[]}},components:{Pagination:n["a"]},methods:{postImage:function(t){return"".concat(o["a"].sq).concat(t)},toPublicAndCommunity:function(t){t>0?this.$router.push({name:"Community",params:{aid:t}}):this.$router.push({path:"/public"})},toP:function(t,e){this.$router.push({name:"PublicCommunity",params:{aid:t,pid:e}})},getPosts:function(){var t=this,e=1,s=this.$route.params.uid;this.$api.getPosts({type:e,"zone-uid":s}).then(function(e){t.myColl=e.data.data.posts.reverse(),console.log(e.data.data)})}},beforeMount:function(){console.log("挂载myColl"),this.getPosts()},destroyed:function(){console.log("销毁collection")}},r=c,l=(s("da5b"),s("fbe9"),s("2877")),u=Object(l["a"])(r,a,i,!1,null,"332777ea",null);e["a"]=u.exports},fbe9:function(t,e,s){"use strict";var a=s("9844"),i=s.n(a);i.a}}]);
//# sourceMappingURL=chunk-1d146137.24866da3.js.map