const {Bonus} = (function(){
    function S(salary) {
        return salary * 4
    }
    function A(salary) {
        return salary * 3
    }
    function B(salary) {
        return salary * 2
    }


    // 当“策略的选择”变的复杂，可能就不能用strategies[level]直接映射了
    const strategies = {
        S,
        A,
        B,
    }


    // Context/上下文 === 一段生命周期 === 一个实例。

    class Bonus {
        constructor() {
            this.salary = null
            this.strategy = null
        }

        // 收集计算因素
        setFactors(salary,level) {
            this.salary = salary
            this.strategy = strategies[level]

        }


        // 执行计算
        getBonus() {
            return this.strategy(this.salary)
        }
    }


    return {
        Bonus
    }
})()
// Context/上下文：一次配置，反复计算
const bonus = new Bonus()

bonus.setFactors(8000,'S')

console.log(bonus.getBonus())