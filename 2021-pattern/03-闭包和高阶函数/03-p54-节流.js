function throttle(func, interval = 500) {
    let timer
    let baseTime = Date.now()

    return function () {
        clearTimeout(timer)

        let doTime = Date.now()
        let remainning = interval - (doTime - baseTime)

        if (remainning <= 0) {
            func.apply(this, arguments)
            baseTime = Date.now()
        } else {
            timer = setTimeout(() => {
                func.apply(this, arguments)
                baseTime = Date.now()

            }, remainning)
        }
    }
}



window.onresize = throttle(()=>console.log(1))
