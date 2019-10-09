import { config } from '../../utils/config';
import { getUserId, setValue, getValue } from '../../utils/common';
import { login } from '../../services/user';
import { getMySubject } from '../../services/subject';

Page({
  data: {
    activeCollapse: [],
    subjectCode: '',
    mySubject: '',
    myModules: []
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
      let activeCollapse = [];
      res.data.modules.map((item) => {
        activeCollapse.push(item.name);
      })
      this.setData({
        subjectCode: res.data.subject_code,
        mySubject: res.data.subject_name,
        myModules: res.data.modules,
        totalCount: res.data.totalCount,
        doneCount: res.data.doneCount,
        errorCount: res.data.errorCount,
        activeCollapse
      })
    })
  },
  onChangeCollapse(event) {
    this.setData({
      activeCollapse: event.detail
    });
  },
  goToSubject: function () {
    wx.navigateTo({
      url: "/pages/subject/index"
    });
  },
  goToPractice: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=all&subjectCode=' + this.data.subjectCode
    })
  },
  goToRandomPractice: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=random&subjectCode=' + this.data.subjectCode
    })
  },
  goToError: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=error&subjectCode=' + this.data.subjectCode
    })
  },
  goToCollect: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=collect&subjectCode=' + this.data.subjectCode
    })
  },
  goToHistory: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=history&subjectCode=' + this.data.subjectCode
    })
  },
  goToExam: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?type=random&subjectCode=' + this.data.subjectCode
    })
  },
  
});
