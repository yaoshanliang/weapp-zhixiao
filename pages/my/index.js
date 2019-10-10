import { getUserInfo } from '../../services/user';

Page({
  data: {
    userInfo: {}
  },
  onShow() {
    getUserInfo().then((res) => {
      this.setData({
        userInfo: res.data
      })
    })
  },
  goToLogin() {
    wx.navigateTo({
      url: '/pages/start/index',
    })
  }
});