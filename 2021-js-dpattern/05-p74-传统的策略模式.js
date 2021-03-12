const {Bonus} = (function(){
    class PerformanceS {
        calculate(salary) {
            return salary * 4
        }
    }

    class PerformanceA {
        calculate(salary) {
            return salary * 3
        }
    }

    class PerformanceB {
        calculate(salary) {
            return salary * 2
        }
    }

    const strategies = {
        S:PerformanceS,
        A:PerformanceA,
        B:PerformanceB,
    }

    // Context/上下文：负责收集一切计算所需的要素、并执行计算。
    // 计算要素包括：所选择策略实现、策略所需要的的输入
    // 怎么收集、怎么储存都不管：
    // 策略实现是外部传入得到，还是通过传入字符串匹配内部策略实现得到
    // 所选择策略实现、策略所需要的的输入是一同传入，还是分批传入
    // 传入后是用各自的对象状态储存，还是直接合并成一个闭包函数储存
    class Bonus {
        constructor() {
            this.salary = null
            this.strategy = null
        }

        // 收集计算因素
        setFactors(salary,level) {
            this.salary = salary
            this.strategy = new strategies[level]

        }


        // 执行计算
        getBonus() {
            return this.strategy.calculate(this.salary)
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