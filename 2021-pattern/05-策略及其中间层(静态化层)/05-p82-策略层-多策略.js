// 将策略放在独立文件中
// 策略
function isLengthLargerThan(limit) {
    return function (message, target) {
        if (target.length <= limit) {
            return message
        }
    }
}

function isFieldSatisfy(func) {
    return function (msg, target) {
        const { items, field } = target;
        for (const item of items) {
            if (!func(item[field])) {
                return msg;
            }
        }
    };
}


// 策略中间层
// 迭代函数的静态化层
class Validator {
    constructor() {
        this.validations = []
    }
    // addRule与validate的父亲可能不一样
    // 当需要延迟执行时，才需要把函数参数变为对象属性
    // 分离定义和执行，实现一次定义，多次执行
    addRule(target, rule) {
        this.validations.push(() => rule.validator(rule.message, target))

    }

    validate() {
        // 为父函数完成了统一执行多个校验的功能，为父函数完成了reduce多个校验结果的功能
        for (const validation of this.validations) {

            const errorMsg = validation()
            if (errorMsg) return errorMsg
        }
    }
}




const validator = new Validator();

validator.addRule(
    [1],
    { message: '至少必须有一个报送单位', validator: isLengthLargerThan(0) }
);

validator.addRule(
    { items: [{ companyId: '' }], field: 'companyId' },
    { message: '公司名不能为空', validator: isFieldSatisfy(_ => _) }
);


console.log(
    validator.validate()

);
