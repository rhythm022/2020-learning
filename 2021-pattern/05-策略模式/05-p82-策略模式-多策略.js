// export function isNotEmpty(errorMsg, value) {
//     if (value === '') return errorMsg
// }

// export function isEndLargerThanStart(message, { endTime, startTime }) {
//     if (!endTime || !startTime) return message
//     endTime = new Date(`2020-01-01 ${endTime}:00`)
//     startTime = new Date(`2020-01-01 ${startTime}:00`)

//     if (startTime >= endTime) {
//         return message

//     }

// }

function isLengthLargerThan(limit) {
    return function (message, value) {
        if (value.length <= limit) {
            return message
        }
    }

}

function isFieldSatisfy(func) {
    return function (msg, value) {
        const { items, field } = value;
        for (const item of items) {
            if (!func(item[field])) {
                return msg;
            }
        }
    };

}

class Validator {
    constructor() {
        this.validations = []
    }
    addRule(value, rule) {
        const validation =  (rule,value)=>() => rule.validator(rule.message, value)

        if (Array.isArray(rule)) {
            rule.forEach(rule => this.validations.push(validation(rule,value)));
        } else {
            this.validations.push(validation(rule,value))
        }

    }

    validate() {
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
    { message: '公司名不能为空', validator: isFieldSatisfy(target => !!target) }
);


console.log(
    validator.validate()

);