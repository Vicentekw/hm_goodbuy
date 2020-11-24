import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"
// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
      id: 0,
      value: "全部订单",
      isActive: true
    },
    {
      id: 1,
      value: "待付款",
      isActive: false
    },
    {
      id: 2,
      value: "代发货",
      isActive: false
    },
    {
      id: 3,
      value: "退款/退货",
      isActive: false
    },
  ],
  },
  onShow() {
    // 判断是否存在token
    const token = wx.getStorageSync("token");
    if(!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }
    let pages = getCurrentPages();
    let currentPage = pages[pages.length-1];
    const {type} = currentPage.options;
    // console.log(type);
    this.getChangeTitle(type-1);
    this.getOrders(type);
  },
  async getOrders(type) {
     const res = await request({url:"/my/orders/all",data:{type}})
     console.log(res);
  },
  getChangeTitle(index) {
    console.log(index);
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  },
    // 点击tabs 方法事件
    handletansItemChange(e) {
      // console.log(e);
      // 1.获取被点击的标题索引
      const {index} = e.detail;
      // 2.修改源数组
     this.getChangeTitle(index);
    }
})