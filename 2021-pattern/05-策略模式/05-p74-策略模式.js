function S(salary) {
    return salary * 4
}
function A(salary) {
    return salary * 3
}
function B(salary) {
    return salary * 2
}


// 拥有状态变化才需要有object
// object === context === 一段生命周期。

function getBonus(salary,strategy) {
    return strategy(salary)
}


const bonus = getBonus(600,S)
console.log(bonus)
