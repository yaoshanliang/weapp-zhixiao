// 当前环境
export const env = 'test';

// 接口地址
const proxy = {
  dev: 'http://zhixiao.dev.com',// 开发环境
  test: 'https://zhixiao.iat.net.cn',// 测试环境
  prod: 'https://zhixiao.iat.net.cn'// 正式环境
}

export const config = {

  // 前缀
  prefix: proxy[env] + '/weapp/',

};