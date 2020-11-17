import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  /**
   * 页面的初始数据
   */

   queryParma:{
    query:'',
    cid:'',
    pagenum:1,
    pagesize:10
   },

  data: {
    tabs: [{
      id: 0,
      value: "综合",
      isActive: true
    },
    {
      id: 1,
      value: "销量",
      isActive: false
    },
    {
      id: 2,
      value: "价格",
      isActive: false
    },
  ],
  goodsList:[],
  totalPage:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    this.queryParma.cid = options.cid
    this.getGoodList()
  },

  //获取商品列表
 async getGoodList() {
      const res = await request({url:'/goods/search',data:this.queryParma})
      console.log('商品数据',res);
       this.totalPage = Math.ceil( res.total / this.queryParma.pagesize )
      // console.log(this.totalPage);
      this.setData({
        // 拼接了数组
        goodsList:[...this.data.goodsList,...res.goods]
      })
  },

  // 下拉刷新 触底加载数据
  onReachBottom() {
    console.log(this.totalPage);
    if (this.queryParma.pagenum >= this.totalPage) {
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none',
        duration: 1500,
      });
        
      console.log('%c没有下一页', 'color: red;font-size: 24px;font-weight: bold;text-decoration: underline;');
    }else{
      this.queryParma.pagenum++;
      this.getGoodList()
      console.log('%c有下一页', 'color:green;font-size: 24px;font-weight: bold;text-decoration: underline;');
    }
  },

  // 点击tabs 方法事件
  handletansItemChange(e) {
    console.log(e);
    // 1.获取被点击的标题索引
    const {index} = e.detail;
    // 2.修改源数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 3.赋值到data中
    this.setData({
      tabs
    })
  }
})