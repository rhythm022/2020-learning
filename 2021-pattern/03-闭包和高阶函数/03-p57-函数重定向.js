function addEvent(el, type, handler_func) {

    if (window.addEventListener) {
        //函数重定向
        addEvent = function (el, type, handler_func) {
            el.addEventListener(type, handler_func)
        }
    } else if (window.attachEvent) {
        addEvent = function (el, type, handler_func) {
            el.addEventListener(`on${type}`, handler_func)
        }
    }

    addEvent(el, type, handler_func)
}