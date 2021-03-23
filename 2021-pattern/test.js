let promise01 = interview()

let promise02 = promise01.then(() => {
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,500)
    })

})

console.log(promise01)
console.log(promise02)
setTimeout(() => {
    console.log(promise01)
    console.log(promise02)
}, 800)
setTimeout(() => {
    console.log(promise01)
    console.log(promise02)
}, 1000)


function interview() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('interview success')
        }, 400)
    })
}