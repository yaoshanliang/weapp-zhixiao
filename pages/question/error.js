
import { getUserId, setValue, getValue } from '../../utils/common';
import { getErrorQuestions } from '../../services/question';

Page({
  data: {
    activeCollapse: [],
    subjectCode: '',
    questionList: [],
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
                login({ code: res.code, ...userInfo }).then((res) => {
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
  onShow() {
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
      url: '/pages/practice/index?subjectCode=' + this.data.subjectCode + '&type=all'
    })
  },
  goToRandomPractice: function (t) {
    wx.navigateTo({
      url: '/pages/practice/index?subjectCode=' + this.data.subjectCode + '&type=random'
    })
  },
  goToExam: function (t) {
    wx.navigateTo({
      url: '/pages/exam/index',
    })
  },

});
