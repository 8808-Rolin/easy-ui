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
	   
    /* 注册 **/
	
	// 验证学号和手机号的唯一性
	uniVariable(params) {
		return axios.get(`${base.sq}/api/tool/uni-variable`, {params});
	},
	
	// 获取学校列表
	getCollegeList() {
	     return axios.get(`${base.sq}/api/tool/get-college-list`);    
	},
	// 上传头像
	uploadImage(params) {
	    return axios.post(`${base.sq}/api/tool/upload-image`, qs.stringify(params));    
	},
	// 上传注册数据
    register(params) {
        return axios.post(`${base.sq}/api/user/register`, qs.stringify(params));    
    },
	
    /* 忘记密码 **/
    forgetPassword(params) {        
        return axios.post(`${base.sq}/api/user/forget-password`, qs.stringify(params));    
    },
	
	/* 获取个人信息 **/
	getCommonPersonInformation(params) {        
	    return axios.post(`${base.sq}/api/info/get-common-person-information`, qs.stringify(params));    
	},
	
	/* 获取公告列表 **/
	getSimpleNotice() {
		return axios.get(`${base.sq}/api/bbs/get-simple-notice`);
	}
	
}

export default user;