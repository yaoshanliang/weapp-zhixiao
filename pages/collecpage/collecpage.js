Page({

  data: {
    errorAll: [{
      question_ids: []
    }],
    errorEach: []
  },

  onLoad: function (options) {
    var category = wx.getStorageSync('category');
    this.setData({
      category: category
    });
    this.getChapter();
  },

  onReady: function () {

  },

  onShow: function () {
    this.getChapter();
  },

  goOrderPlay: function () {
    wx.redirectTo({
      url: "../moni/moni"
    });
  },

  getChapter: function () {
    var t = this, r = [], n = [], i = [], o = [];
    wx.getStorage({
      key: "delstar" + t.data.category.id,
      success: function (t) {
        o = t.data;
      }
    }), wx.getStorage({
      key: "starids" + t.data.category.id,
      success: function (e) {
        console.log(o);
        for (var s = e.data, a = 0; a < o.length; a++) for (g = 0; g < s.length; g++) if (s[g][Object.keys(s[g]).toString()].indexOf(o[a]) > -1) {
          var c = s[g][Object.keys(s[g]).toString()].indexOf(o[a]);
          s[g][Object.keys(s[g]).toString()].splice(c, 1), 0 == s[g][Object.keys(s[g]).toString()].length && s.splice(g, 1);
        }
        wx.setStorage({
          key: "starids" + t.data.category.id,
          data: s
        }), wx.removeStorage({
          key: "delstar" + t.data.category.id
        });
        for (var u = "", g = 0; g < s.length; g++) {
          s[g][Object.keys(s[g]).toString()].toString() && (u += s[g][Object.keys(s[g]).toString()].toString() + ",");
          for (a = 0; a < r.length; a++) Object.keys(s[g]).toString() == r[a].chapter_id && i.push({
            title: r[a].title,
            question_ids: s[g][Object.keys(s[g]).toString()]
          });
        }
        n = "" != u ? [{
          title: "全部收藏",
          question_ids: u.slice(0, -1).split(",")
        }] : [{
          title: "全部收藏",
          question_ids: []
        }], t.setData({
          errorAll: n,
          errorEach: i
        });
      },
      fail: function () { }
    });
  },

  goquestion: function (t) {
    wx.navigateTo({
      url: "../errorstar/errorstar?ids=" + t.currentTarget.dataset.ids.join(",") + "&title=" + t.currentTarget.dataset.title + "&navtitle=我的收藏&cateName=" + this.data.category.name
    })
  },

})