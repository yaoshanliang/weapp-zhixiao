import { config } from '../../utils/config';
import { getUserId, setValue, getValue } from '../../utils/common';
import { login } from '../../services/user';
import { getMySubject } from '../../services/subject';

Page({
  data: {
    mySubject: ''
  },
  onLoad(options) {
    var t = this;
    if (getUserId() == '') {
      wx.getUserInfo({
        success: function (res) {
          let user = res;
          let userInfo = res.userInfo;
          wx.login({
            success: function (res) {
              console.log(res);
              if (res.code) {
                login({ code: res.code, ...userInfo}).then((res) => {
                  if (res.code === 0) {
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
          wx.redirectTo({
            url: '/pages/authorize/index',
          })
        }
      })
    }
  },
  onShow(){
    getMySubject().then((res) => {
      this.setData({
        mySubject: res.data.subject_name
      })
    })
  },
  myQuestion: function () {
    wx.navigateTo({
      url: "/pages/subject/index"
    });
  },
  orderGo: function (t) {
    var that = this;
    var uid = app.globalData.uid;
    wx.request({
      url: app.globalData.url + '/routine/auth_api/get_setting_value',
      method: 'get',
      dataType: 'json',
      data: {
        uid: uid,
        key: 'useLearn'
      },
      success: function (res) {
        if (res.data.data.value == "true") {
          var e = 1;
          t && t.currentTarget.dataset.mode && (e = 2), setTimeout(function () {
            wx.navigateTo({
              url: '/pages/moni/moni?mode=' + e,
            })
          }, 30)
        } else {
          wx.showToast({
            title: '练习模式未开启',
            icon: 'loading'
          })
        }
      }
    })

  },
  defaultGo: function (t) {
    var e = this;
    "0" == t.currentTarget.dataset.ind ? (setTimeout(function () {
      wx.navigateTo({
        url: "../errorpage/errorpage?ids=" + JSON.stringify(e.data.orderids),
      })
    }, 30), getApp().sectionList = JSON.stringify(this.data.orderids)) : setTimeout(function () {
      wx.navigateTo({
        url: "../collecpage/collecpage?ids=" + JSON.stringify(e.data.orderids)
      });
    }, 30)
  },
  examGo: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/examhome/examhome',
      })
    }, 30)
  },
  gradeGo: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/grade/grade"
      });
    }, 30);
  },
  headerMenu: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/rank/rank"
      });
    }, 30);
  }
});
