// pages/category/category.js
var app = getApp();
// question = require('../../utils/question.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedCate:'',
    cateList:[],
    cattext:'',
    loading:!1,
    storageCate:''
  },

  onLoad: function (e) {
    let that = this;
    let uid = app.globalData.uid;
    let storageCate = wx.getStorageSync('category');
    that.setData({
      uid: uid,
      storageCate: storageCate == '' ? '' : storageCate.id
    })
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_cate_list',
      method: 'get',
      dataType: 'json',
      data: {
        uid: uid,
      },
      success: function (res) {
        that.setData({
          cateList:res.data.data,
        })
        if(!storageCate){
          var category = { 'id': res.data.data[0].id, 'name': res.data.data[0].name,'number':res.data.data[0].number,'time':res.data.data[0].time,'passf':res.data.data[0].passf}
          wx.setStorageSync('category', category)
          that.setData({
            selectedCate: res.data.data[0].id
          })
        }else{
          that.setData({
            selectedCate: storageCate.id
          })
        }
        that.startInit()
      }
    });
  },

  onReady: function () {

  },

  onShow: function () {
    
  },
  cardSelect:function(t){
    this.setData({
      selectedCate: t.currentTarget.dataset.cateid,
      selectedCateName: t.currentTarget.dataset.name,
      selectedCateNum: t.currentTarget.dataset.number,
      selectedCateTime: t.currentTarget.dataset.time,
      selectedCatePassf: t.currentTarget.dataset.passf
    })
    this.startInit()
  },

  startInit:function(){
    var that = this;
    that.setData({
      loading: !0
    }), wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_question_count',
      method: 'get',
      dataType: 'json',
      data: {
        uid: that.data.uid,
        cateid:that.data.selectedCate
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        setTimeout(function () {
          that.setData({
            loading: !1
          });
        }, 1e3);
        that.setData({
          count:res.data.count,
        });
      }
    })
  },

  clickOver:function(t){
    var that = this;
    return that.data.loading ? (that.setData({
      zzzToast: {
        show: !0,
        title: "稍等，正在更新最新题库"
      }
    }), void setTimeout(function () {
      that.setData({
        zzzToast: {
          show: !1,
          title: "稍等，正在更新最新题库"
        }
      });
      }, 1500)) : ("" != that.data.storageCate && that.data.storageCate != that.data.selectedCate ? wx.showModal({
        title: "温馨提示",
        content: "您确定要切换题库吗？",
        success:function(e){
          e.confirm ? (wx.clearStorage(), wx.setStorageSync('category', { 'id': that.data.selectedCate, 'name': that.data.selectedCateName,'number':that.data.selectedCateNum,'time':that.data.selectedCateTime,'passf':that.data.selectedCatePassf}),that.getUserInfoAgain()) : e.cancel && console.log("用户点击取消");
        }
      }) : that.goHome())
  },

  goHome: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_question_list',
      method: 'get',
      dataType: 'json',
      data: {
        uid: that.data.uid,
        cateid:that.data.selectedCate
      },
      success:function(res){
        if(res.statusCode == 200){
          var q = 'q_'+that.data.selectedCate,qid='qid_'+that.data.selectedCate,qData=res.data.data.question_list,qidData=res.data.data.question_id;
          wx.setStorage({
            key: q,
            data: qData,
            complete: function () {
              wx.setStorage({
                key: qid,
                data: qidData,
                complete:function() {
                  question.initQuestions(q, qid);
                }
              });
              wx.hideLoading();
              var category = wx.getStorageSync('category');
              category.count = that.data.count;
              wx.setStorageSync('category', category);
              wx.switchTab({
                url: "../index/index"
              })
            }
          });
        }
      }
    })
  },

  getUserInfoAgain (){
    var that = this
    wx.getUserInfo({
      lang: 'zh_CN',
      success: function (res) {
        var userInfo = res.userInfo
        wx.login({
          success: function (res) {
            if (res.code) {
              userInfo.code = res.code;
              userInfo.spid = app.globalData.spid;
              wx.request({
                url: app.globalData.url + '/routine/login/index',
                method: 'post',
                dataType: 'json',
                data: {
                  info: userInfo
                },
                success: function (res) {
                  console.log(res)
                  wx.setStorageSync('uid', res.data.data.uid);
                  app.globalData.uid = res.data.data.uid;
                  app.globalData.openid = res.data.data.routine_openid;
                  that.setData({
                    userInfo: res.data.data
                  });
                  var category = { 'id': that.data.selectedCate, 'name': that.data.selectedCateName,'number':that.data.selectedCateNum,'time':that.data.selectedCateTime,'passf':that.data.selectedCatePassf}
                  wx.setStorageSync('category', category)
                  that.goHome()
                }
              })
            } else {
              console.log('登录失败！' + res.errMsg)
            }
          }
        });
      }
    })
  }

})