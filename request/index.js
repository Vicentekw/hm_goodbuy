export const request=(parmas)=>{
    //定义公共的url
    const baseurl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({
            ...parmas,
            url:baseurl+parmas.url,
            success: (result)=>{
                resolve(result.data.message);
            },
            fail: (err)=>{
                reject(err);
            }
        });
    })
}

