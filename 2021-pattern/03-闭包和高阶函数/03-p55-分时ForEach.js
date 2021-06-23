function chunkForEach(list, func, chunk = 2) {// chunk：一次处理的量
    const LIST_LENTH = list.length
    const CHUNK = chunk
    let iteration = 0


    function excucate() {
        let base = iteration * CHUNK
        for (let i = 0; i < Math.min(CHUNK, LIST_LENTH - base); i++)
            func(list[base + i])

        if (++iteration < LIST_LENTH / CHUNK) {
            setTimeout(() => {
                excucate()// 递归
            }, 0);
        }
    }
    excucate()
   
}


chunkForEach(new Array(7).fill(0), console.log)

console.log('停一下')
