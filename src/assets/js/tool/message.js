/**
 * 
 * 消息提示组件：
 * 
 * 
 * 
 * **/

export function alertOK(type, message) {
    this.$message({
        type,
        message
    });
}
export default alertOK;