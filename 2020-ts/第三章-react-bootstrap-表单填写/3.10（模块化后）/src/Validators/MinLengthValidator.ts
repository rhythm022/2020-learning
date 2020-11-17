import {IValidator} from "./IValidator";
import {stringOrNull} from "../Types";

export class MinLengthValidator implements IValidator<stringOrNull> {
    private minLength: number;

    constructor(minLength: number) {
        this.minLength = minLength
    }

    public IsValid(input: stringOrNull): boolean {
        if (!input)
            return false
        return input.length >= this.minLength
    }
}
