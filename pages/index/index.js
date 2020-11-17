//引入用来发生请求的方法 
import {
  request
} from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    cateList:[],
    floorList:[]
  },

  // 页面开始加载 就会触发
  onLoad: function (options) {
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     console.log(result);
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });
    this.getSwiperList();
    this.getCateList();
    this.getFloorist();
  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url: '/home/swiperdata',
    }).then(result => {
      console.log(result);
      this.setData({
        swiperList: result
      })
    })
  },
   //获取分类导航数据
  getCateList() {
    request({
      url: '/home/catitems',
    }).then(result => {
      console.log(result);
      this.setData({
        cateList: result
      })
    })
  },
//获取楼层数据
  getFloorist() {
    request({
      url: '/home/floordata',
    }).then(result => {
      console.log(result);
      this.setData({
        floorList: result
      })
    })
  },
})