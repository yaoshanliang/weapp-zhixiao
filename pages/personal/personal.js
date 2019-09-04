var e = [{
  icon: "https://bmob-cdn-24471.bmobcloud.com/2019/07/11/e2c738a74048b4fa801ccf82800a8c8e.png",
  title: "我的成绩",
  msg: "",
  showRight: 1
},{
  icon: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/center/icon/icon_center_tj.png",
  title: "分享好友",
  msg: "",
  showRight: 1
}, {
  icon: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/center/icon/icon_center_msg.png",
  title: "意见反馈",
  msg: "",
  showRight: 1
}, {
  icon: "http://picture.eclicks.cn/kaojiazhao/public/wx_xcx/center/icon/icon_center_download.png",
  title: "关于我们",
  msg: "",
  showRight: 1
}];

Page({
  data: {
    cellList: e,
    userInfo: {},
  },
  onLoad: function (e) {
  },
  onShow: function () {
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
  go_view: function (e) {
    switch (1 * e.currentTarget.dataset.viewind) {
      case 0:
        wx.navigateTo({
          url: '../grade/grade',
        })
        break;
      case 1:
        break;
      case 2:
        wx.navigateTo({
          url: '../feedback/feedback',
        })
        break;
      case 3:
        this.about()
        break;
    }
  },
  about() {
    wx.showModal({
      title: '关于我们',
      content: '本程序仅供考试学习使用，请勿使用于商业用途，如有问题，请联系QQ：903363777、微信：kossfirst。',
      showCancel: false
    })
  },
  onShareAppMessage: function () {
    return {
      title: "智汇答题Plus，考试助手 ！",
      path: "pages/start/start",
      imageUrl: "https://bmob-cdn-24471.bmobcloud.com/2019/07/11/9353ef0240fb00bc800956b373ee92e5.png"
    };
  }
});