import {MinLengthValidator} from "../Validators/MinLengthValidator";
import {RegularExpressionValidator} from "../Validators/RegularExpressionValidator";
import {IPersonState} from "../State";
import {IValidation} from "./IValidation";

export class AddressValidation implements IValidation {
    private readonly minLengthValidator: MinLengthValidator = new MinLengthValidator(5)
    private readonly zipCodeValidator: RegularExpressionValidator = new RegularExpressionValidator("^[0-9]{5}(?:-[0-9]{4})$")

    Validate(state: IPersonState, errors: string[]): void {
        if (!this.minLengthValidator.IsValid(state.Address1)) {
            errors.push("address1 必须大于5个字符")
        }

        if (!this.minLengthValidator.IsValid(state.Town)) {
            errors.push("Town 必须大于5个字符")
        }

        if (!this.minLengthValidator.IsValid(state.Country)) {
            errors.push("Country 必须大于5个字符")
        }

        if (!this.zipCodeValidator.IsValid(state.Postcode)) {
            errors.push("Postcode 格式有问题")
        }
    }
}
