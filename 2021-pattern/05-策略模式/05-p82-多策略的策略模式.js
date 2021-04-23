export function isNotEmpty(errorMsg, value) {
    if (value === '') return errorMsg
}




export function isEndLargerThanStart(message,{endTime, startTime}){
    if(!endTime || !startTime)return message
    endTime = new Date(`2020-01-01 ${endTime}:00`)
    startTime = new Date(`2020-01-01 ${startTime}:00`)

    if(startTime >= endTime)  {
        return message

    }

}

export function isLengthLargerThan(limit){
    return function(message,value){
        if(value.length <= limit){
            return message
        }
    }

}

export function isFieldSatisfy(func) {
    return function(msg, value) {
        const {items, field} = value;
        for (const item of items) {
            if (!func(item[field])) {
                return msg;
            }
        }
    };

}

export class Validator {
    constructor() {
        this.validations = []
    }
    addRule(value, rule) {
        if(Array.isArray(rule)){
            rule.forEach(r => {
                this.validations.push(() => {
                    return r.validator(r.message, value)
                })
            });

        }else{
            this.validations.push(() => {
                return rule.validator(rule.message, value)
            })
        }

    }

    validate() {
        for (const validation of this.validations) {

            const errorMsg = validation()
            if (errorMsg) return errorMsg
        }
    }
}



const checkEditable = function(){
    const validator = new Validator();
  
    validator.addRule(
        {endTime: this.editable$$.endTime, startTime: this.editable$$.startTime},
        {message: '日期必填且结束时间须大于开始时间', validator: isEndLargerThanStart}
    );
  
    validator.addRule(
        this.editable$$.companyCfgs,
        {message: '至少必须有一个报送单位', validator: isLengthLargerThan(0)}
    );
  
    validator.addRule(
        {items: this.editable$$.companyCfgs, field: 'companyId'},
        {message: '公司名不能为空', validator: isFieldSatisfy(target => !!target)});
  
    validator.addRule(
        {items: this.editable$$.companyCfgs, field: 'routes'},
        {
          message: '每个报送单位至少须报送一条航线',
          validator: isFieldSatisfy(target => Object.keys(target).some(k => target[k])),
        }
    );
  
    return validator.validate();
  
  
  }