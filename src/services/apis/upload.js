/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-10-15 18:25:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-10-25 18:10:10
 */
import axios from '../request'

// 上传文件接口
export const uploadFile = (data, headers) => {
    return axios.post('/eve/rest/file/operate/upload', data, {
        headers: headers
    })
}