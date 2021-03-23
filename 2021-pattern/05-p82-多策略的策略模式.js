
const { isNotEmpty, isEnoughLength, isPhone, Validator } = (function () {
    function isNotEmpty(errorMsg, value) {
        if (value === '') return errorMsg
    }

    function isEnoughLength(minLength) {
        return function (errorMsg, value) {
            if (value.length < minLength) return errorMsg

        }
    }

    function isPhone(errorMsg, value) {

        if (!/(^1[3|5|8][0-9]{9})$/.test(value)) return errorMsg
    }

    class Validator {
        constructor() {
            this.validations = []
        }
        addRule(value, rules) {
            rules.forEach(rule => {
                this.validations.push(() => {
                    return rule.validator(rule.message, value)
                })
            });

        }

        validate() {
            for (const validation of this.validations) {

                const errorMsg = validation()
                if (errorMsg) return errorMsg
            }
        }
    }

    return {
        isNotEmpty,
        isEnoughLength,
        isPhone,
        Validator
    }
})()


const form = {
    username: 'wewe',
    password: '12312',
    phone: 13000000000,
}



const onsubmit = function () {
    //validator为计算上下文
    const validator = new Validator()

    // 收集计算因素
    validator.addRule(form.username, [{ message: '用户名不能为空', validator: isNotEmpty }, { message: '用户名长度不能少于2个字', validator: isEnoughLength(2) }])
    validator.addRule(form.password, [{ message: '密码长度不能少于六位', validator: isEnoughLength(6) }])
    validator.addRule(form.phone, [{ message: '手机号码格式不对', validator: isPhone }])


    //执行计算
    const errorMsg = validator.validate()

    console.log(errorMsg)
}

onsubmit()