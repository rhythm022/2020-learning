function uploadFile(id){
    console.log(`开始上传文件${id}`)
}


const proxyUploadFile = (function(){

    const cache = []
    const timer = null 
    return function(id){
        cache.push(id)
        if(timer) return 

        timer = setTimeout(()=>{
            cache.forEach(uploadFile)

            
            clearTimeout(timer)
            timer = null
            cache.length = 0
        },2000)
    }
})()