// 源行为
let uploadFile = (id)=>{
    console.log(`开始上传文件：${id}`)
}

// 代理中间层
const uploadFileProxy = function(uploadFile){

    const cache = []
    let timer = null
    return function(id){
        cache.push(id)

        if(timer) return

        timer = setTimeout(()=>{
            timer = null

            cache.forEach(uploadFile)
            cache.length = 0

        },2000)
    }
}


uploadFile = uploadFileProxy(uploadFile)


uploadFile(1)
uploadFile(2)
uploadFile(3)
