import {MinLengthValidator} from "../Validators/MinLengthValidator";
import {IPersonState} from "../State";
import {IValidation} from "./IValidation";

export class PersonValidation implements IValidation {
    private readonly firstNameValidator: MinLengthValidator = new MinLengthValidator(1)
    private readonly lastNameValidator: MinLengthValidator = new MinLengthValidator(2)

    Validate(state: IPersonState, errors: string[]): void {
        if (!this.firstNameValidator.IsValid(state.FirstName)) {
            errors.push("姓 必须大于1个字符")
        }

        if (!this.lastNameValidator.IsValid(state.LastName)) {
            errors.push("名 必须大于2个字符")
        }

    }
}
