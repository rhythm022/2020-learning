function chunk(list, func, chunk = 2) {
    const LIST_LENTH = list.length
    const CHUNK = chunk
    let iteration = 0


    function excucate(){
        let base = iteration * CHUNK
        for (let i = 0; i < Math.min(CHUNK,LIST_LENTH - base); i++) {
            // 执行主函数：回调函数/闭包内方法“以多任务中循环执行的方式”进行执行
            func(list[base + i])

        }

        iteration++

        if (iteration < LIST_LENTH / CHUNK) {
            setTimeout(() => {
                excucate()
            }, 0);
        } 
    }
    return function () {
        excucate()
   
    }
}



const list = new Array(7).fill(0)
const console_chunk = chunk(list, n => {
    console.log(n)
})

console_chunk()
console.log('again')

// 一个函数实例只能调用一次
console_chunk()