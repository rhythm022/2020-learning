let ret
// 在传统Promise的用法中，是通过在then中return new Promise来达到异步串行流程控制
// 在async/await的用法中，是通过在await new Promise来达到异步串行流程控制
// asyncFunc相当于把其函数体放在Promise.resolve().then()的回调函数体里面（所以★asyncFunc === callback函数）

async function func02() {
    // 相当于在Promise.resolve().then()后新链一个“then中return new Promise”的then，再链一个“then中return ret”的then
    const ret =  await new Promise((reolve, reject) => {
        setTimeout(() => {
            reolve(4)
        }, 500)
    })

    return ret
}

async function func01() {// 相当于在Promise.resolve().then()后新链一个“then中return new Promise”的then
    return new Promise((reolve, reject) => {
        setTimeout(() => {
            reolve(4)
        }, 500)
    })
}



const promise01 = func01()

console.log(
    promise01,
)

setTimeout(() => {
    console.log(
        promise01,
    )

}, 1000)