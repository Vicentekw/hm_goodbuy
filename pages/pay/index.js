import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast,
  requestPayment
} from "../../utils/asyncWx.js";
import {request} from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"
Page({


  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow() {
    // 获取缓存中收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中购物车信息
    let cart = wx.getStorageSync('cart') || [];
    // 筛选出有勾选的商品数组
    cart = cart.filter(v => v.checked)
    // 总价格
    let totalPrice = 0;
    // 总数量
    let totalNum = 0
    //  循环数组获取总价格和总数量
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.goods_price * v.num;
        totalNum += v.num;
      }
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    })
  },
  // 商品支付功能
  async handleOrderPay() {
    try {
          // 1 判断用户有没有授权  没有则跳转到授权页面
     const token = wx.getStorageSync('token');
     if(!token){
       wx.navigateTo({
         url: '/pages/auth/index',
       }); 
       return;
     }
    // 2 获取 请求头
    //  const header = {Authorization:token};
   // 3 获取创建订单所需要的参数
      const order_price = this.data.totalPrice;
      const consignee_addr = this.data.address.all;
      const cart = this.data.cart;
      let goods= [];
      cart.forEach(v=>goods.push({
        goods_id:v.goods_id,
        goods_number:v.num,
        goods_price:v.goods_price
      }))
      let OrderParmas = {order_price,consignee_addr,goods};
      // 4发起创建订单请求
       const {order_number} = await request({url:"/my/orders/create",method:"POST",data:OrderParmas});
       
       //5发起支付参数请求
       const {pay} = await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{order_number}});
        // console.log(pay);
       //6微信支付
        await requestPayment(pay);
       //7 查询后台 订单状态
       const res = await request({url:"/my/orders/chkOrder",method:"POST",data:{order_number}});
       await showToast({title:'支付成功'});
       // 支付成功  跳转到订单页面
       wx.navigateTo({
         url: '/pages/order/index'
       });
    } catch (error) {
      await showToast({title:'支付失败'});
      console.log(error);
    }

  }
})