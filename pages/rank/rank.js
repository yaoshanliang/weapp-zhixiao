var app = getApp();
Page({

  data: {
    cateid:'',
    moreData:true,
    markShow: !1,
    page:1,
    limit:50,
    rankList:[],
  },

  onLoad: function (options) {

  },

  onReady: function () {

  },

  onShow: function () {
    var category = wx.getStorageSync('category');
    var params = {
      uid:app.globalData.uid,
      cateid: category.id,
      page:this.data.page,
      limit:this.data.limit
    }
    this.getRankList(params);
  },

  goBack: function () {
    wx.navigateBack({

    })
  },

  getRankList(params){
    var t = this;
    wx.showLoading({
      'title': '加载中'
    });
    
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_rank_list',
      method: 'get',
      dataType: 'json',
      data:params,
      success: function (res) {
        t.setData({
          rankList:res.data.data
        });
        wx.hideLoading();
      }
    })
  },
  
  onShareAppMessage: function () {
    return {
      title: "开来看看我的答题成绩吧！",
      path: "pages/start/start",
      imageUrl: "https://bmob-cdn-24471.bmobcloud.com/2019/07/11/9353ef0240fb00bc800956b373ee92e5.png"
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