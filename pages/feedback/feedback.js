var app = getApp();
Page({

  data: {

  },

  onLoad: function (options) {

  },

  bindsubmit: function (e) {
    var params = {
      'mobilephone': e.detail.value.phone,
      'content': e.detail.value.content
    }
    if (params.mobilephone == "" || params.content == "") {
      wx.showToast({
        title: "请填写完整",
        icon: 'loading',
        duration: 2e3
      })
      return false;
    }
    if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(params.mobilephone))) {
      wx.showToast({
        title: "手机号码有误",
        icon: 'loading',
        duration: 2e3
      })
      return false;
    } 

    var uid = app.globalData.uid;
    params.uid = uid;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/save_feedback?uid=' + uid,
      method: 'post',
      dataType: 'json',
      data: params,
      success: function (res) {
        wx.showModal({
          title: "反馈成功",
          content: "已经收到您的反馈，谢谢您的关注！",
          showCancel: !1,
          confirmText: "我知道啦",
          confirmColor: "#1bd0ad",
          success: function (e) {
            wx.navigateBack();
          }
        });
      }
    })
  }
})