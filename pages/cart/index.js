import {
  getSetting,
  chooseAddress,
  openSetting
} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({


  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中购物车信息
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.setCart(cart);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  async handleChooseAdd() {
    try {
      let address = await chooseAddress();
      // console.log(address);
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      wx.setStorageSync('address', address)
    } catch (error) {
      console.log(error);
    }
  },


  //商品的选择
  handleItemChange(e) {
    // 1 获取点击复选框商品的Id值
    const goods_id = e.currentTarget.dataset.id

    // 2获取购物车数组
    let {
      cart
    } = this.data
    // 3 找到被修改商品的对象
    let index = cart.findIndex(v => v.goods_id === goods_id)

    // 4 选中状态取反
    cart[index].checked = !cart[index].checked

    this.setCart(cart)
  },

  //商品全选

  handleItemAllChange() {
      // 1 获取购物车数组
      let {cart,allChecked} = this.data;
      allChecked = !allChecked
      cart.forEach(v=>{
        v.checked = allChecked
      })
      this.setCart(cart)
  },

  // 设置底部状态
  setCart(cart) {
   
    // 总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0
    let allChecked = true;
    //  循环数组获取总价格和总数量
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      } else {
        allChecked = false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false;
    // 给data赋值
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart',cart);
  },
  // 购物车商品数量编辑
  handleItemNumEdit(e) {
    // 获取商品对应的操作和id值
    let {operation , id} = e.currentTarget.dataset;

    // 获取购物车数组
    let {cart} = this.data;

    //拿到要修改商品的索引
    let index = cart.findIndex(v=>v.goods_id === id);
     
    // 判断是否执行删除
    if(cart[index].num === 1 && operation === -1){
      
    }
     


    // 进行修改数量
    cart[index].num+=operation

    //设置回数组和缓存
    this.setCart(cart)
  },
})