
Page({

  data: {
    autoRemove: !0
  },

  onLoad: function (o) {
    var category = wx.getStorageSync('category');
    this.setData({
      category: category
    });
  },

  onReady: function () {

  },

  onShow: function () {
    this.getChapter();
    var t = wx.getStorageSync("autoRemove");
    t ? this.setData({
      autoRemove: t
    }) : wx.setStorageSync("autoRemove", !0);
  },

  getChapter:function() {
    var t = this, r = [], a = [];
    wx.getStorage({
      key: "errorids"+t.data.category.id,
      success: function(e) {
        console.log(e)
        for(var i = e.data,n = "",s=0; s<i.length;s++){
          i[s][Object.keys(i[s]).toString()].toString() && (n += i[s][Object.keys(i[s]).toString()].toString() + ",");
        }
        r = "" != n ? [{
          title: "全部错题",
          question_ids: n.slice(0, -1).split(",")
        }] : [{
          title: "全部错题",
          question_ids: []
        }], t.setData({
          errorAll: r,
          errorEach: a
        });
      },
    })
  },
  switchChange: function (t) {
    wx.setStorageSync("autoRemove", t.detail.value)
  },
  goOrderPlay: function () {
    wx.redirectTo({
      url: "../moni/moni"
    });
  },
  goquestion: function (t) {
    wx.navigateTo({
      url: "../errorstar/errorstar?ids=" + t.currentTarget.dataset.ids.join(",") + "&title=" + t.currentTarget.dataset.title + "&navtitle=我的错题&cateName="+this.data.category.name
    })
  },
})