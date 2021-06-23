// 源函数
function __uploadFile(id){
    console.log(`开始上传文件${id}`)
}

// 代理函数
const uploadFile = function(){

    const cache = []
    const timer = null 
    return function(id){
        cache.push(id)
        
        if(timer) return 

        timer = setTimeout(()=>{
            cache.forEach(__uploadFile)

            
            clearTimeout(timer)
            timer = null
            cache.length = 0
        },2000)
    }
}