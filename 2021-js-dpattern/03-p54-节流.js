const throttle = function (func, interval) {
    let timerId = null

    // 未计时时，执行回调函数/闭包内方法
    return function () {
        if (timerId) return

        func.apply(this, arguments)

        timerId = setTimeout(() => {
            clearTimeout(timerId);timerId = null

        }, interval || 500)
  
    }
}

window.onresize = throttle(()=>console.log(1))