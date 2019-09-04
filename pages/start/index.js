import { config } from '../../utils/config';
import { getUserId, setValue, getValue } from '../../utils/common';
import { login } from '../../services/user';

Page({
  data: {
    userInfo: {},
    angle: 0,
    status: false, //是否通过审核
    remind: '加载中',
    checkUser: false
  },

  onLoad: function(options) {

  },

  onShow: function() {
    var t = this;
    wx.getUserInfo({
      success: function (res) {
        let user = res;
        let userInfo = res.userInfo;
        wx.login({
          success: function (res) {
            console.log(res);
            if (res.code) {
              login({ code: res.code, ...userInfo }).then((res) => {
                if (res.code === 0) {
                  t.setData({
                    userInfo: res.data,
                    finish: true
                  })
                  setValue('userInfo', res.data);
                  setValue('userInfoTimestamp', Date.parse(new Date()) / 1000);
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: res.msg
                  })
                }
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.errMsg,
              })
            }
          }
        });
      },
      fail: function (res) {
        // wx.redirectTo({
        //   url: '/pages/authorize/index',
        // })
      }
    })
  },

  onReady: function() {
    var that = this;
    setTimeout(function() {
      that.setData({
        remind: ''
      });
    }, 1000);
  },

  getUserInfo() {
    let t = this;
    wx.getUserInfo({
      success: function (res) {
        let user = res;
        let userInfo = res.userInfo;
        wx.login({
          success: function (res) {
            console.log(res);
            if (res.code) {
              login({ code: res.code, ...userInfo }).then((res) => {
                if (res.code === 0) {
                  t.setData({
                    userInfo: res.data,
                    finish: true
                  })
                  setValue('userInfo', res.data);
                  setValue('userInfoTimestamp', Date.parse(new Date()) / 1000);
                  wx.redirectTo({
                    url: '/pages/home/index',
                  })
                } else {
                  wx.showToast({
                    icon: 'none',
                    title: res.msg,
                  })
                }
              })
            } else {
              wx.showToast({
                icon: 'none',
                title: res.errMsg,
              })
            }
          }
        });
      },
      fail: function (res) {
        wx.showToast({
          icon: 'fail',
          title: '授权失败'
        })
      }
    })
  },

  goSign: function() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.redirectTo({
      url: '/pages/home/index',
    })
    // console.log(this.data.checkUser)
    // if (this.data.checkUser) {
    //   let userInfo = this.data.userInfo
    //   if (userInfo.status == '1') {
    //     wx.redirectTo({
    //       url: '/pages/index/index',
    //     })
    //   } else if (userInfo.status == '0') {
    //     wx.navigateTo({
    //       url: '../status/index',
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: '../register/index',
    //     })
    //   }
    //   wx.hideLoading()
    // } else {
    //   wx.redirectTo({
    //     url: '/pages/index/index',
    //   })
    //   wx.hideLoading()
    // }
  }
})