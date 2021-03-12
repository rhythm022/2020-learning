const { getBonus } = (function () {

    function performanceS(salary) {
        return salary * 4
    }
    function performanceA(salary) {
        return salary * 3
    }
    function performanceB(salary) {
        return salary * 2
    }


    // 当“策略的选择”变的复杂，可能就不能用strategies[level]直接映射了，需要有专门的工厂函数形如getStrategies(level)
    const strategies = {
        S: performanceS,
        A: performanceA,
        B: performanceB,
    }



    // 函数式是无状态的，所以，不存在计算上下文的存储问题，每次计算都是独立无状态的
    // 只要是做计算并把一个个不同的策略实现单独分离了出来，就是策略模式
    function getBonus(salary, level) {
        return strategies[level](salary)
    }


    return {
        getBonus
    }
})()



console.log(
    getBonus(8000, 'S')
)