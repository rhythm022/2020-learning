import {IValidator} from "./IValidator";
import {stringOrNull} from "../Types";

export class RegularExpressionValidator implements IValidator<stringOrNull> {
    private regex: RegExp;

    constructor(expression: string) {
        this.regex = new RegExp(expression)
    }


    public IsValid(input: stringOrNull): boolean {
        if (!input)
            return false

        return this.regex.test(input)
    }
}
