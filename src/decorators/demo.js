/*
 * @Description: 
 * @Author: Ymh
 * @Date: 2019-10-11 13:44:41
 * @LastEditors: Ymh
 * @LastEditTime: 2019-10-11 13:44:41
 */
/**
 * @description: 装饰器的demo
 * @param {type} 
 * @return: 
 */
export const demo = ({ }) => {

    return WrappedComponent => {
        return (props) => {
            
            return <WrappedComponent {...props} />
        }
    }
}
