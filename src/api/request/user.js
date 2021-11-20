import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const user = {    
    /* 登录 **/
    login(params) {        
        return axios.post(`${base.sq}/api/user/login`, qs.stringify(params));    
    },
	
	/* 登出 **/
	logout() {
	     return axios.get(`${base.sq}/api/user/logout`);    
	},
	   
    /* 注册相关接口 **/
	
	// 验证学号和手机号的唯一性
	uniVariable(params) {
		return axios.get(`${base.sq}/api/tool/uni-variable`, {params});
	},
	
	// 上传注册数据
    register(params) {
        return axios.post(`${base.sq}/api/user/register`, qs.stringify(params));    
    },
	
	/* 通用接口 **/
	
	// 忘记密码
	forgetPassword(params) {        
	    return axios.post(`${base.sq}/api/user/forget-password`, qs.stringify(params));    
	},
	
	// 获取个人信息
	getCommonPersonInformation(params) {        
	    return axios.post(`${base.sq}/api/info/get-common-person-information`, qs.stringify(params));    
	},
	
	// 上传头像
	uploadImage(params) {
	    return axios.post(`${base.sq}/api/tool/upload-image`, qs.stringify(params));    
	},
	
	// 邮件发送接口
	sendEmail(params) {
		return axios.post(`${base.sq}/api/tool/send-email`, qs.stringify(params));
	},
	
	// 获取社员列表
	getMemberList(params) {
		return axios.get(`${base.sq}/api/tool/get-member-list`, {params});
	},
	
	// 获取所有社团列表
	getAssociationList() {
		return axios.get(`${base.sq}/api/tool/get-association-list`);
	},
	
	// 文件上传接口
	uploadFile(params) {
		return axios.post(`${base.sq}/api/tool/upload-file`, qs.stringify(params));
	},
	
	// 获取所有学院列表
	getCollegeList() {
	     return axios.get(`${base.sq}/api/tool/get-college-list`);    
	},
	
	// 下载文件接口
	downloadFile(params) {
		return axios.post(`${base.sq}/api/tool/download-file`, qs.stringify(params));
	},
	
	// 获取总的帖子类型
	getPostType() {
	     return axios.get(`${base.sq}/api/tool/get-post-type`);    
	},
	
	/* 首页相关接口 **/
	
	// 获取公告列表 
	getSimpleNotice() {
		return axios.get(`${base.sq}/api/bbs/get-simple-notice`);
	},
	
	// 创建社团审批
	createAss(params) {
		return axios.post(`${base.sq}/api/bbs/create-ass`, qs.stringify(params));
	},
	
	/* 论坛页面相关接口 **/
	
	// 获取论坛顶部数据接口 
	getShowData(params) {
		return axios.post(`${base.sq}/api/bbs/get-show-data`, qs.stringify(params));
	},
	
	// 获取帖子列表数据接口
	getPostList(params) {
		return axios.get(`${base.sq}/api/bbs/get-post-list`, {params});
	},
	
	// 发表帖子接口 
	releasePost(params) {
		return axios.post(`${base.sq}/api/bbs/release-post`, qs.stringify(params));
	},
	
	// 论坛页面获取相关个人和论坛信息接口
	getAssInformation(params) {
		return axios.post(`${base.sq}/api/bbs/get-ass-information`, qs.stringify(params));
	},
	
	//  申请加入社团接口
	joinAssociation(params) {
		return axios.post(`${base.sq}/api/apply/join-association`, qs.stringify(params));
	},
	
	//  获取社团活动列表接口
	getActionOverview(params) {
		return axios.post(`${base.sq}/api/info/get-action-overview`, qs.stringify(params));
	},
	
	//  获取活动详细信息接口
	getActionInfo(params) {
		return axios.post(`${base.sq}/api/info/get-action-info`, qs.stringify(params));
	},
	
	//  申请参加活动接口
	participate(params) {
		return axios.post(`${base.sq}/api/action/participate`, qs.stringify(params));
	},
	
	/* 帖子页面相关接口 **/
	
	// 获取帖子与发帖人信息
	getPostPageInfo(params) {
		return axios.post(`${base.sq}/api/bbs/get-post-page-info`, qs.stringify(params));
	},
	
	// 获取回复和回复人列表
	getDiscussList(params) {
		return axios.post(`${base.sq}/api/bbs/get-discuss-list`, qs.stringify(params));
	},
	
	// 提交回复
	releaseDiscuss(params) {
		return axios.post(`${base.sq}/api/bbs/release-discuss`, qs.stringify(params));
	},
	
	// 删除帖子以及回复
	deletePostDiscuss(params) {
		return axios.post(`${base.sq}/api/bbs/delete-post-discuss`, qs.stringify(params));
	},
	
	// 修改帖子
	modifyPost(params) {
		return axios.post(`${base.sq}/api/bbs/modify-post`, qs.stringify(params));
	},
	
	// 收藏帖子
	favoriteProcess(params) {
		return axios.get(`${base.sq}/api/bbs/favoriteProcess`, {params});
	},
	
	// 搜索页面相关接口
	search(params) {
		return axios.get(`${base.sq}/api/bbs/search`, {params});
	},
	
	/* 个人空间相关接口 **/
	
	// 权限验证
	getZoneStatus(params) {
		return axios.get(`${base.sq}/api/zone/get-zone-status`, {params});
	},
	
	// 获取我的（他的）帖子和收藏
	getZoneStatus(params) {
		return axios.get(`${base.sq}/api/zone/get-zone-status`, {params});
	},
	
	/*  获取我的邮件 */
	
	// 清空邮箱
	deleteMail(params) {
		return axios.get(`${base.sq}/api/info/delete-mail`, {params});
	},
	
	// 获取邮箱概要数据
	getMails(params) {
		return axios.get(`${base.sq}/api/info/get-mails`, {params});
	},
	
	// 获取邮件内容
	getMailContent(params) {
		return axios.get(`${base.sq}/api/info/get-mail-content`, {params});
	},
	
	// 获取我的个人信息和公告 
	getInformation(params) {
		return axios.get(`${base.sq}/api/zone/get-information`, {params});
	},
	
	// 修改公告
	updateNotice(params) {
		return axios.post(`${base.sq}/api/zone/update-notice`, qs.stringify(params));
	},
	
	/* 修改个人信息 */
	
	// 修改昵称
	updateName(params) {
		return axios.post(`${base.sq}/api/zone/update-name`, qs.stringify(params));
	},
	
	// 修改简介
	updateIntro(params) {
		return axios.post(`${base.sq}/api/zone/update-intro`, qs.stringify(params));
	},
	
	// 修改头像
	updateProfile(params) {
		return axios.post(`${base.sq}/api/zone/update-profile`, qs.stringify(params));
	},
	
	// 修改电子邮箱
	updateEmail(params) {
		return axios.post(`${base.sq}/api/zone/update-email`, qs.stringify(params));
	},
	
	// 修改生日
	updateBirth(params) {
		return axios.post(`${base.sq}/api/zone/update-birth`, qs.stringify(params));
	},
}

export default user;