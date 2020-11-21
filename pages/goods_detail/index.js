import {
  request
} from "../../request/index.js"

import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  //构建全局商品详情对象
  Goods_info: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {
      goods_id
    } = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id)
  },

  async getGoodsDetail(goods_id) {
    console.log(goods_id);
    const goodsObj = await request({
      url: '/goods/detail',
      data: {
        goods_id: goods_id
      }
    })
    this.Goods_info = goodsObj
    console.log('商品详情', goodsObj);
    this.setData({
      goodsObj: {
        goods_price: goodsObj.goods_price,
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce,
        //iphone 部分手机 不识别 webp图片格式
        // webp => jpg 
        // goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'jpg'),
        pics: goodsObj.pics,
      }
    })
  },

  //点击预览放大图片
  handleViewBigImage(e) {
    const {
      index
    } = e.currentTarget.dataset
    const utils = this.Goods_info.pics.map(v => v.pics_mid_url)
    wx.previewImage({
      current: utils[index],
      urls: utils
    });

  },

  //点击 加入购物车
  handleCartAdd() {
    console.log(222);
    // 1 获取购物车缓存数据
    const cart = wx.getStorageSync('cart') || [];

    // 2 判断点击的商品是否在购物车数据中

    const index = cart.findIndex(v => v.goods_id === this.Goods_info.goods_id);

    // 3 拿到对应索引值  进行数组数量相加判断
    if (index === -1) {
      //没有存在数据中
      this.Goods_info.num = 1;
      this.Goods_info.checked = true;
      cart.push(this.Goods_info)
    } else {
      //存在数组中  相对num++
      cart[index].num++;
    }

    // 4 存缓存数据
    wx.setStorageSync('cart', cart);

    //  5. 加入购物车提示框
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})