var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    addupexam:0,
    pass:0,
    rankfs: "0",
    markShow: !1,
    userInfo: {
      nickName: "未授权",
      avatarUrl: "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png"
    }
  },

  onLoad: function (options) {
    var a = this;
    wx.getUserInfo({
      success: function (t) {
        a.setData({
          userInfo: {
            nickName: t.userInfo.nickName,
            avatarUrl: t.userInfo.avatarUrl || "https://picture.eclicks.cn/kaojiazhao/public/wx_xcx/default/gungun.png"
          }
        })
      }
    });
  },

  onReady: function () {

  },

  onShow: function () {
    var t = this;
    wx.showLoading({
      title: '加载中',
    })
    var uid = app.globalData.uid;
    console.log(uid)
    var category = wx.getStorageSync('category');
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_user_history',
      method: 'get',
      dataType: 'json',
      data: {
        uid: uid,
        cateid:category.id,
        passf:category.passf
      },
      success: function (res) {
        for(var e = 0,r = [],s = 0;s < res.data.data.length; s++) e += 1 * res.data.data[s].score
        
        t.setData({
          addupexam:res.data.count.times,
          pass:res.data.count.passf,
          list : res.data.data,
          rankfs: res.data.count.times == 0 ? 0: (e / (1 * res.data.count.times)).toFixed(0),
        });
        wx.hideLoading();
      }
    })
  },

  onShareAppMessage:function (){
    return {
      title: "开来看看我的答题成绩吧！",
      path: "pages/start/start",
      imageUrl:"https://bmob-cdn-24471.bmobcloud.com/2019/07/11/9353ef0240fb00bc800956b373ee92e5.png"
    }
  },

  go_show_mark: function () {
    this.setData({
      markShow: !this.data.markShow
    });

  },

  onMyEvent: function (t) {
    console.log(this.data.saveImgUrl)
    1 == t.detail.code && this.go_show_mark(), 2 == t.detail.code && (wx.showLoading({
      title: "图片生成中"
    }), this.go_show_mark(), a.handelShowShareImg(this, this.data.saveImgUrl));
  },
})