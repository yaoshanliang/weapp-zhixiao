Page({

  data: {

  },

  onLoad: function (e) {
    var category = wx.getStorageSync('category');
    var ytimesf = e.ytimes.split(":")[0]
    var ytimesm = e.ytimes.split(":")[1]
    this.setData({
      category:category,
      rightNum: e.greenNum,
      errNum: e.redNum,
      unAnswerNum: e.allQuestionCount - e.allNum,
      ytimesf: ytimesf,
      ytimesm: ytimesm,
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  examBack: function () {
    wx.redirectTo({
      url: "../exam/exam?timeback=1&passf=" + this.data._repeat_passf + "&time=" + (this.data._repeat_time - 1) + "&training_qids=0&nums=" + this.data._repeat_num
    });
  },

  exam_repeat: function () {
    this._repeat_examGo(this);
  },

  _repeat_examGo: function (e) {
    if (!e.data.category.time) return wx.showLoading({
      title: "考题读取中"
    }), void setTimeout(function () {
      wx.hideLoading();
    }, 999);
    wx.removeStorage({
      key: "exam" + this.data.category.id
    }), wx.removeStorage({
      key: "examlist" + this.data.category.id
    }), wx.removeStorage({
      key: "examind" + this.data.category.id
    }), wx.removeStorage({
      key: "examids" + this.data.category.id
    }), wx.removeStorage({
      key: "examall" + this.data.category.id
    }), wx.redirectTo({
      url: "../exam/exam?passf=" + e.data.category.passf + "&time=" + (e.data.category.time - 1) + "&training_qids=0&nums=" + e.data.category.number
    });
  }
})