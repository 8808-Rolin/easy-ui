(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-753955ea"],{3785:function(e,t,s){},"73fb":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("HeaderNoRight"),s("div",{staticClass:"login_box"},[s("div",{staticClass:"easy_photo box"}),s("div",{staticClass:"login box"},[s("div",{},[s("h3",[e._v("登录")]),s("div",{staticClass:"login_way"},[s("div",{staticClass:"no_login",class:{active:!e.user.loginType},attrs:{disabled:!e.user.loginType},on:{click:e.noOrPhone}},[e._v("\n\t\t\t\t\t\t学号登录\n\t\t\t\t\t")]),s("div",{staticClass:"phone_login",class:{active:e.user.loginType},attrs:{disabled:e.user.loginType},on:{click:e.noOrPhone}},[e._v("\n\t\t\t\t\t\t手机登录\n\t\t\t\t\t")])]),s("div",{staticClass:"login_form"},[s("el-input",{directives:[{name:"show",rawName:"v-show",value:!e.user.loginType,expression:"!user.loginType"}],attrs:{type:"text",autofocus:"",placeholder:"学   号","prefix-icon":"el-icon-user"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.Commit(t)}},model:{value:e.user.account,callback:function(t){e.$set(e.user,"account",t)},expression:"user.account"}}),s("el-input",{directives:[{name:"show",rawName:"v-show",value:e.user.loginType,expression:"user.loginType"}],attrs:{type:"text",autofocus:"",placeholder:"手机号","prefix-icon":"el-icon-mobile-phone"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.Commit(t)}},model:{value:e.user.account,callback:function(t){e.$set(e.user,"account",t)},expression:"user.account"}}),s("el-input",{attrs:{type:"password",placeholder:"密   码","prefix-icon":"el-icon-key"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.Commit(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),s("div",{staticClass:"remember"},[s("el-checkbox",{model:{value:e.checked,callback:function(t){e.checked=t},expression:"checked"}},[e._v("记住密码")])],1),s("el-button",{attrs:{id:"login_btn",type:"primary"},on:{click:e.Commit}},[e._v("登 录")])],1),s("div",{staticClass:"login_links"},[s("router-link",{attrs:{to:{path:"/forget"},underline:!1}},[e._v("忘记密码？")]),s("router-link",{attrs:{to:{path:"/register"},underline:!1}},[e._v("还没有账号？前往注册")])],1)])])]),s("div",{attrs:{id:"go_back"}},[s("i",{staticClass:"el-icon-warning-outline"}),s("router-link",{attrs:{to:{path:"/"}}},[e._v("返回首页")])],1)],1)},n=[],o=s("cebc"),i=s("6323"),r=s("1c46"),c=s.n(r),l=(s("4328"),s("e988")),u={name:"Login",data:function(){return{checked:!1,password:null,message:null,user:{loginType:0,account:"",password:""}}},components:{HeaderNoRight:i["a"]},methods:{noOrPhone:function(){this.user.loginType=0===this.user.loginType?1:0,this.user.account="",this.password=""},Commit:function(){var e=this;null!==this.message&&this.message.close(),this.user.password=this.password,this.checked&&l["a"].setItem({name:"password",value:Object(o["a"])({},this.user,{checked:this.checked}),expires:60});var t=c.a.createHash("md5");t.update(this.password),this.user.password=t.digest("hex"),this.$api.login(this.user).then(function(t){console.log(t.data.data.uid+"@@@@"),0===t.data.data.code?(l["a"].setItem({name:"token",value:{token:t.data.data.token,uid:t.data.data.uid},expires:60}),e.$router.push({path:"/"}),e.$store.commit("updateExistUser",!0)):(l["a"].removeItem("token"),l["a"].removeItem("password"),e.message=e.$message.error({message:t.data.data.msg}))})}},beforeMount:function(){var e=l["a"].getItem("password");this.user.loginType=0,e&&(this.password=e.password,this.user.account=e.account,this.checked=e.checked,this.user.loginType=e.loginType)}},d=u,p=(s("a0f0"),s("2877")),h=Object(p["a"])(d,a,n,!1,null,null,null);t["default"]=h.exports},a0f0:function(e,t,s){"use strict";var a=s("3785"),n=s.n(a);n.a}}]);
<<<<<<< HEAD:dist/js/chunk-753955ea.04fc2ea4.js
//# sourceMappingURL=chunk-753955ea.04fc2ea4.js.map
=======
//# sourceMappingURL=chunk-753955ea.2ebe29f4.js.map
>>>>>>> origin/lch:dist/js/chunk-753955ea.2ebe29f4.js
