// plugins/errorHandler.js

export default {
  install(app) {
    app.config.errorHandler = (error, vm, info) => {
      console.log(error, vm, info);
      // 这里可以根据具体业务需求处理错误
      // 例如，如果是接口返回的错误
      if (error.response) {
        const { status, data } = error.response;
        // 根据状态码和响应数据进行处理
        if (status === 400) {
          // 业务异常处理
          console.log('业务异常:', data.errorMsg);
        } else if (status === 500) {
          // 服务器错误处理
          console.log('服务器错误:', data.errorMsg);
        }
      } else {
        // 其他错误处理
        console.log('其他错误:', error.message);
      }
    };
  },
};
