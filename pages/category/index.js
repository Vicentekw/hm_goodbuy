//引入用来发生请求的方法 
import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({
  data: {
    leftmenuList:[],
    rightContent:[],
    catesList:[],
    currentIndex:0,
    scroll_top:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 商品分类缓存技术
      const cates = wx.getStorageSync("cates");
      if(!cates){
        this.getCates()
      }else{
        //判断是否时间过期重新请求  过期时间5分钟
        if (Date.now() - cates.time > 60000 * 5) {
          // console.log('时间过期重新请求');
          this.getCates()
        }else{
          // console.log('使用旧数据');
          this.catesList = cates.data;
          let leftmenuList = this.catesList.map(v=>v.cat_name)
          let rightContent = this.catesList[0].children
          this.setData({
            leftmenuList,
            rightContent
          })
        }
      }

  },
  
  //获取分类页面
  async getCates() {
      // request({url:"/categories"}).then(res=>{
      //   this.catesList = res.data.message
      //   wx.setStorageSync("cates", {time:Date.now(),data:this.catesList});
      //   // console.log(this.catesList);
      //   // 左侧大菜单数据
      //   let leftmenuList = this.catesList.map(v=>v.cat_name)
      //   let rightContent = this.catesList[0].children
      //   this.setData({
      //     leftmenuList,
      //     rightContent
      //   })
      // })
    //  1 使用es7 async  await发送请求
     const res = await request({url:"/categories"});
       this.catesList = res
        wx.setStorageSync("cates", {time:Date.now(),data:this.catesList});
        // console.log(this.catesList);
        // 左侧大菜单数据
        let leftmenuList = this.catesList.map(v=>v.cat_name)
        let rightContent = this.catesList[0].children
        this.setData({
          leftmenuList,
          rightContent
        })
  },
  handleItemTap(e) {
       console.log(e);
       const {index} = e.currentTarget.dataset
          // 右侧栏商品数据
          let rightContent = this.catesList[index].children

           // scroll_top 重新设置  右侧内容scroll-view标签的距离顶部的距离
       this.setData({
         currentIndex:index,
         rightContent,
         scroll_top:0
       })
  }
})