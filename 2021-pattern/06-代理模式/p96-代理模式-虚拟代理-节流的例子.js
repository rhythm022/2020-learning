// 源函数
let uploadFile = (id)=>{
    console.log(`开始上传文件：${id}`)
}

// 虚拟代理
const uploadFileProxy = function(uploadFile){

    const cache = []
    let timer = null
    return function(id){
        cache.push(id)

        if(timer) return

        timer = setTimeout(()=>{
            clearTimeout(timer)
            timer = null

            cache.forEach(uploadFile)
            cache.length = 0

        },2000)
    }
}


uploadFile = uploadFileProxy(uploadFile)


uploadFile(1)
