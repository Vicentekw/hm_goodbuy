let ajaxTimes = 0;   //同上发送异步代码的次数
export const request = (parmas) => {
    //显示加载动画
    ajaxTimes++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })
    //定义公共的url
    const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...parmas,
            url: baseurl + parmas.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0) {
                    //关闭加载动画
                    wx.hideLoading()
                }
            }
        });
    })
}