export const getSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.getSetting({
            withSubscriptions: true,
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });      
    })
}

export const chooseAddress=()=>{
    return new Promise((resolve,reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });      
    })
}


export const openSetting=()=>{
    return new Promise((resolve,reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        });      
    })
}


export const showModal=({content})=>{
    return new Promise((resolve,reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
               resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}


export const showToast=({title})=>{
    return new Promise((resolve,reject)=>{
        wx.showToast({
            title: title,
            icon:'none',
            success: (result) => {
               resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}

/*
* Promise形式 的 login 方法
*/ 
export const login=()=>{
    return new Promise((resolve,reject)=>{
        wx.login({
            success: (result) => {
               resolve(result)
            },
            fail: (err)=>{
                reject(err)
            }
        });
    })
}