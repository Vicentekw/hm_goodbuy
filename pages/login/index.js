// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //登录把个人信息存入缓存
  bindGetUserInfo(e) {
    // console.log(e);
    const {userInfo} = e.detail;
    wx.setStorageSync("userinfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})