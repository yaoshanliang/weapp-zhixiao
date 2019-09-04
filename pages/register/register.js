// pages/register/register.js
var app = getApp();
Page({

  data: {

  },

  onLoad: function (options) {

  },


  onShow: function () {

  },

  register:function(e){
    var that = this;
    let params = e.detail.value
    if (params.company == '' || params.department == '' || params.realname == '') {
      wx.showToast({
        title: '请填写完整',
        icon: 'loading'
      })
      return false
    }
    let uid = wx.getStorageSync('uid');
    wx.request({
      url: app.globalData.url + '/routine/auth_api/user_register?uid='+uid,
      method: 'post',
      dataType: 'json',
      data: params,
      success: function (res) {
        if(res.data.msg == "success"){
          wx.showToast({
            title: '提交成功',
            success: function () {
              setTimeout(function () {
                wx.reLaunch({
                  url: '../status/status',
                })
              }, 1000)
            }
          });
        }else{
          wx.showLoading({
            title: '提交失败！',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
        }
      }
    });
    var formId = e.detail.formId;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/save_formid',
      method: 'get',
      dataType: 'json',
      data: {
        uid: uid,
        formid:formId
      },
      success: function (res) {
        console.log(res)
      }
    })
  }
})