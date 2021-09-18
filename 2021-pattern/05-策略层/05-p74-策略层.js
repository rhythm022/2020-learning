// 将策略放在独立文件中
// 策略
function S(salary) {
    return salary * 4
}
function A(salary) {
    return salary * 3
}
function B(salary) {
    return salary * 2
}

// 策略中间层为父函数选择策略并执行策略
function getBonus(salary,strategy) {
    const dict = {
        A,
        B,
        S
    }
    return dict[strategy](salary)
}


const bonus = getBonus(600,'S')
console.log(bonus)
