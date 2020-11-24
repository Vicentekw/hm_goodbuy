import {
  showModal,
  showToast,
  login
} from "../../utils/asyncWx.js";
import {
  request
} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 获取用户授权信息

  async bindGetUserInfo(e) {
    try {
      const { encryptedData,iv,rawData,signature} = e.detail;
      // 通过内置wx登录API 获取code
     const {code} =  await login();
     console.log('code',code);
     let Loginparmas = {encryptedData,iv,rawData,signature,code};
     const token ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
      wx.setStorageSync('token',token)
      wx.navigateBack({
        delta: 1, // 回退前 delta(默认为1) 页面
      })
    //   const {token} = request({url:"/users/wxlogin",data:Loginparmas,method:"post"})
    //  console.log(token);
    } catch (error) {
      console.log(error);
    }
  }
})