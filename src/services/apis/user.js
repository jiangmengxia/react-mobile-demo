/*
 * @Description: 
 * @Author: 
 * @Date: 2019-10-25 18:09:33
 * @LastEditors: 
 * @LastEditTime: 2019-10-25 18:10:32
 */
import axios from '../request'

// 登录
export const login = (data) => {
    return axios.post('/ares/rest/auth/login', {
        systemId: 300, // 潘多拉全年系统
        clientId: 303, // 潘多拉机构端
        ...data,
    })
}