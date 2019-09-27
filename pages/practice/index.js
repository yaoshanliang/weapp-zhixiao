import { getQuestions } from '../../services/question';
import { getValue, setValue, addValueFromArray, removeValueFromArray } from '../../utils/common';

Page({

  data: {
    history: 0,
    questionCount: 0,
    questionList: [],
    myAnswerList: {},
    current: 0,
    correctNum: 0,
    errorNum: 0,
    questionMode: 0,
    pannelUp: 0,
  },

  onLoad: function (options) {
    console.log(options);
    wx.showLoading({
      title: '加载中',
    });
    getQuestions({
      subjectCode: options.subjectCode,
      moduleCode: options.moduleCode,
    }).then((res) => {
      if (res.code == 0) {
        this.setData({
          questionCount: res.data.count,
          questionList: res.data.list,
          myAnswerList: res.data.myAnswerList
        })
        wx.hideLoading();
      }
    })
  },

  onReady: function () {

  },

  onShow: function () {

  },

  // 收藏
  collect: function (event) {
    let index = event.currentTarget.dataset.index;

    let myAnswerList = this.data.myAnswerList;
    myAnswerList[index].collect = myAnswerList[index].collect == 1 ? 0 : 1;
    this.setData({
      myAnswerList
    })
  },

  init_play: function (a) {
    var category = wx.getStorageSync('category');
    s = category.id;
    var e = this,
      r = a.mode;
    this.setData({
      mode: r
    }), "2" == e.data.mode ? (n = "randow", wx.setNavigationBarTitle({
      title: '随机练习',
    })) : (n = "order", wx.setNavigationBarTitle({
      title: '顺序练习',
    }), e.setData({
      iconcircle: '',
    })), e.getMsg(r), wx.getStorage({
      key: n + "list" + s,
      success: function (t) {
        console.log(t)
        e.setData({
          orderPX: t.data,
          allNum: t.data.all
        });
        var a = 0,
          r = 0;
        for (var d in e.data.orderPX) "red" == e.data.orderPX[d] ? (a++ , e.setData({
          redNum: a
        })) : "green" == e.data.orderPX[d] && (r++ , e.setData({
          greenNum: r
        }));
      }
    });
  },
  getMsg: function (e) {
    var r = this;
    wx.showLoading({
      title: '加载中',
    });
    var category = wx.getStorageSync('category');
    r.setData({
      cateName: category.name
    })
    wx.getStorage({
      key: n + "" + s,
      success: function (t) {
        r.setData({
          StorageAll: t.data,
        });

      },
      complete: function () {
        var q = wx.getStorageSync('q_' + s),
          n = r.data.iconcircle;
        wx.getStorage({
          key: 'qid_' + category.id,
          success: function (qid) {
            var e = qid.data;
            "2" == r.data.mode && (n = [{
              title: '',
              question_ids: e = a.shuffle(e)
            }]);
            console.log(question.questions["question"])
            for (var i = [], o = 0; o < e.length; o++) i[o] = a.clone(question.questions["question"][e[o]]);
            console.log(i)
            for (var o = 0; o < e.length; o++)
              if (i[o].answerArr = i[o].answer.split(""), r.data.StorageAll[i[o].question_id]) {
                var u = r.data.StorageAll[i[o].question_id];
                "1" == u.subup || "0" == u.after ? i[o].order = u : (console.log(), "多选" == i[o].type_name && (i[o].order = {},
                  i[o].order.subup = 0, i[o].order.down = {
                    A: !1,
                    B: !1,
                    C: !1,
                    D: !1
                  }));
              } else "多选" == i[o].type_name && (i[o].order = {}, i[o].order.subup = 0, i[o].order.down = {
                A: !1,
                B: !1,
                C: !1,
                D: !1
              });
            console.log(i)
            var iconcircle = [{
              'title': '试题',
              'len': 0,
              'question_count': e.length,
              'question_ids': e
            }]
            console.log(iconcircle)
            d = i, r.setData({
              idarr: e,
              iconcircle: iconcircle
            }), setTimeout(function () {
              wx.hideLoading();
            }, 1e3), r.getthree();
          },
        })
      }
    })
  },
  getthree: function () {
    var t = this;
    console.log(n + "ind" + s);
    wx.getStorage({
      key: n + "ind" + s,
      success: function (a) {
        var e = {
          currentTarget: {
            dataset: {
              index: a.data
            }
          }
        }
        t.jumpToQuestion(e);
      },
      fail: function () {
        var a = {
          currentTarget: {
            dataset: {
              index: 0
            }
          }
        };
        t.jumpToQuestion(a);
      }
    }), wx.getStorage({
      key: n + "" + s,
      success: function (a) {
        if (a.data) {
          var e = t.data.orderPX;
          e[t.data.idarr[a.data]] = 'blue', t.setData({
            orderPX: e,
            recmend: !0
          }), t.questionStatus(), setTimeout(function () {
            t.setData({
              recmend: !1
            });
          }, 2e3);
        }
      }
    })
  },

  // 跳转到指定题目
  jumpToQuestion: function (event) {
    let index = event.currentTarget.dataset.index;
    this.setData({
      current: index,
      pannelUp: !this.data.pannelUp,
    })
  },

  // 选中选项
  selectAnswer: function (event) {
    let option = event.currentTarget.dataset.option;
    let answer = event.currentTarget.dataset.answer;
    let index = event.currentTarget.dataset.index;
    let myAnswerList = this.data.myAnswerList;
    let questionList = this.data.questionList;

    // 还未作答过
    if (myAnswerList[index].status == 0) {
      let t = this;

      myAnswerList[index].answer = option;
      // 作答正确
      if (questionList[index].answer == option) {
        myAnswerList[index].status = 1;
        this.setData({
          myAnswerList,
          correctNum: t.data.correctNum + 1
        }, setTimeout(function () {
          // 跳转下一题
          t.setData({
            current: t.data.current + 1,
          })
        }, 500))
      } else {
        myAnswerList[index].status = 2;
        this.setData({
          myAnswerList,
          errorNum: t.data.errorNum + 1
        })
      }
    }
  },

  // 翻页
  pageChange: function (event) {
    this.setData({
      current: event.detail.current
    })
  },

  // 折叠面板
  pannel: function () {
    var t = this;
    this.setData({
      pannelUp: !this.data.pannelUp,
    }), setTimeout(function () {
    }, 0);
  },
  changeTab: function (event) {
    this.setData({
      questionMode: event.currentTarget.dataset.mode,
    })
  },

})