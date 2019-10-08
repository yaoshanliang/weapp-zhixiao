import { getQuestions, postAnswer, postCollect, postAnswers } from '../../services/question';
import { getValue, setValue, addValueFromArray, removeValueFromArray } from '../../utils/common';

Page({

  data: {
    subjectCode: '',
    moduleCode: '',
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
    let t = this;
    wx.showLoading({
      title: '加载中',
    });
    this.setData({
      subjectCode: options.subjectCode,
      // moduleCode: options.moduleCode,
    })
    getQuestions({
      subjectCode: options.subjectCode,
      moduleCode: options.moduleCode ? options.moduleCode : '',
    }).then((res) => {
      if (res.code == 0) {
        // let history = getValue('history');
        // let current = 0;
        // if (history && history[this.data.moduleCode]) {
        //   current = history[this.data.moduleCode].lastIndex;
        //   if (current > 0) {
        //     this.setData({
        //       current,
        //       history: 1
        //     })
        //     this.setData({
        //       current,
        //       history: 1
        //     }, setTimeout(function () {
        //       t.setData({
        //         history: 0,
        //       })
        //     }, 2000))
        //   }
        // }
        this.setData({
          questionCount: res.data.count,
          questionList: res.data.list,
          myAnswerList: res.data.myAnswerList,
          correctNum: res.data.correctNum,
          errorNum: res.data.errorNum,
        }, () => {
          wx.hideLoading();
        })
      }
    })
  },

  // 收藏
  collect: function (event) {
    let index = event.currentTarget.dataset.index;

    let myAnswerList = this.data.myAnswerList;
    let questionList = this.data.questionList;
    myAnswerList[index].collect = myAnswerList[index].collect == 1 ? 0 : 1;
    this.setData({
      myAnswerList
    })

    postCollect({
      subjectCode: this.data.subjectCode,
      moduleCode: questionList[index].module_code,
      questionId: questionList[index].id,
      collect: myAnswerList[index].collect,
    }).then((res) => {
      if (res.code == 0) {

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

      // 保存答案
      postAnswer({
        subjectCode: this.data.subjectCode,
        moduleCode: event.currentTarget.dataset.modulecode,
        questionId: event.currentTarget.dataset.id,
        answer: event.currentTarget.dataset.option,
        status: myAnswerList[index].status,
      }).then((res) => {
        if (res.code == 0) {

        }
      })
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

  // 切换tab
  changeTab: function (event) {
    this.setData({
      questionMode: event.currentTarget.dataset.mode,
    })
  },

  // onUnload() {
  //   postAnswers({
  //     subjectCode: this.data.subjectCode,
  //     moduleCode: this.data.moduleCode,
  //     myAnswerList: this.data.myAnswerList
  //   }).then((res) => {
  //     if (res.code == 0) {

  //     }
  //   })

  //   let history = getValue('history');
  //   if (history && history[this.data.moduleCode]) {
  //     history[this.data.moduleCode].lastIndex = this.data.current;
  //     setValue('history', history);

  //   } else {
  //     if (!history) {
  //       history = {};
  //     }
  //     history[this.data.moduleCode] = { 'lastIndex': this.data.current };
  //     console.log(history);
  //     setValue('history', history);

  //   }
  // }

})