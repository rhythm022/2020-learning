const Type = {}
// 一：运行正常
for (let i = 0, type; type = ['String', 'Array', 'Number'][i]; i++) {
    Type[`is${type}`] = function (obj) {
        console.log(
            type, 'let'
        )
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }

}



console.log(
    Type.isArray([]),
    Type.isString(''),
    Type.isNumber(1),
)





// 二：运行错误（原因：闭包中使用了公共变量var i，而公共变量被篡改）
for (var i = 0, type; type = ['String', 'Array', 'Number'][i]; i++) {
    Type[`is${type}`] = function (obj) {
        console.log(
            type, 'var'
        )
        return Object.prototype.toString.call(obj) === `[object ${type}]`
    }


}





console.log(
    Type.isArray([]),
    Type.isString(''),
    Type.isNumber(1),
)



// 三：运行正常（加了层闭包，该闭包没有公共变量）
for (var i = 0, type; type = ['String', 'Array', 'Number'][i]; i++) {
    (function (type) {
        Type[`is${type}`] = function (obj) {
            console.log(
                type, 'var'
            )
            return Object.prototype.toString.call(obj) === `[object ${type}]`
        }
    })(type)


}





console.log(
    Type.isArray([]),
    Type.isString(''),
    Type.isNumber(1),
)