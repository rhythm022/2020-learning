function throttle(func, interval = 500) {
    let timer
    let baseTime = Date.now()

    return function () {
        clearTimeout(timer) // important

        let remainning = interval - (Date.now() - baseTime)

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
