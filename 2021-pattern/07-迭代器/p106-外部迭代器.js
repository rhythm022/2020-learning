const forEach = function (obj, cb) {
    if (Array.isArray(obj)) {
        for (; i < length; i++) {
            const isContinue = cb(obj[i], i)
            if (!isContinue) break
        }
    } else {
        for (i in obj) {
            const isContinue = cb(obj[i], i)
            if (!isContinue) break
        }
    }
}



forEach({1:2},console.log)