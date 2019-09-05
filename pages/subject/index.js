
import { getSubjects, chooseSubject } from '../../services/question';

Page({
  data: {
    subjectList: [],
    activeSubject: [],
    selectSubjectId: '',
    selectSubjectName: ''
  },

  onLoad: function (e) {
    getSubjects().then((res) => {
      if (res.code == 0) {
        let activeSubject = [];
        res.data.map((item) => {
          activeSubject.push(item.name);
        })
        this.setData({
          subjectList:res.data,
          activeSubject
        })
      }
    })
  },
  onChangeCollapse(event) {
    this.setData({
      activeSubject: event.detail
    });
  },
  onChangeSubject(event) {
    console.log(event);
    this.setData({
      selectSubjectId: "" + event.target.dataset.id,
      selectSubjectName: "" + event.target.dataset.name
    });
  },

  onChooseSubject() {
    chooseSubject({
      subjectId: this.data.selectSubjectId,
      subjectName: this.data.selectSubjectName
    }).then((res) => {
      if (res.code == 0) {
        wx.showToast({
          title: res.message,
          success: function () {
            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/index',
              })
            }, 1000)
          }
        })
      }
    })
  }
  

})