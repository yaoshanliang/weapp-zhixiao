
import { getAllSubjects, chooseSubject, getMySubject } from '../../services/subject';

Page({
  data: {
    subjectList: [],
    activeSubject: [],
    selectSubjectCode: '',
    selectSubjectName: ''
  },

  onLoad: function (e) {
    getAllSubjects().then((res) => {
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
    getMySubject().then((res) => {
      if (res.code === 0) {
        this.setData({
          selectSubjectCode: res.data.subject_code,
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
      selectSubjectCode: "" + event.target.dataset.code,
      selectSubjectName: "" + event.target.dataset.name
    });
  },

  onChooseSubject() {
    chooseSubject({
      subjectCode: this.data.selectSubjectCode,
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