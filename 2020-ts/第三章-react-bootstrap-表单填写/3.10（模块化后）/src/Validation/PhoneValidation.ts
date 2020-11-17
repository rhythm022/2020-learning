import {RegularExpressionValidator} from "../Validators/RegularExpressionValidator";
import {MinLengthValidator} from "../Validators/MinLengthValidator";
import {IPersonState} from "../State";
import {IValidation} from "./IValidation";

export class PhoneValidation implements IValidation {
    private readonly regexValidator: RegularExpressionValidator = new RegularExpressionValidator('[0-9]*')
    private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(1)

    Validate(state: IPersonState, errors: string[]): void {
        if (!this.minLengthValidator.IsValid(state.PhoneNumber)) {
            errors.push("PhoneNumber 必须大于1个字符")
        }else if(!this.regexValidator.IsValid(state.PhoneNumber)){
            errors.push("PhoneNumber 格式有问题")

        }


    }
}
