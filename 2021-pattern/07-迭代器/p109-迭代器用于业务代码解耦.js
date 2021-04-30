const doorKey1 = function () {
    // return '1'
}
const doorKey2 = function () {
    // return '2'
}
const doorKey3 = function () {
    return '3'
}


const matchDoorKeyIterator = function () {
    for (let i = 0, fn; fn = arguments[i++];) {
        const rightObj = fn()
        if (rightObj) return rightObj
    }


    
}



const rightKey = matchDoorKeyIterator(doorKey1, doorKey2, doorKey3)

console.log(rightKey)


