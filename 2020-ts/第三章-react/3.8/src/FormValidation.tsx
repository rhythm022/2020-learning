import {stringOrNull} from './Types'
import {IPersonState} from "./State";
import * as React from "react";
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

interface IValidator<T> {
    IsValid(input: T): boolean
}

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


export interface IValidation {
    Validate(state: IPersonState, errors: string[]): void
}

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

interface IValidationProps {
    CurrentState:IPersonState;
    CanSave:(canSave:boolean) => void
}

export default class FormValidation extends React.Component<IValidationProps> {
    private failures: string[] = []
    private validation:IValidation[]

    constructor(props:IValidationProps) {
        super(props);

        this.validation = [new PersonValidation(),new AddressValidation(),new PhoneValidation()]
    }

    private Validate(){
        this.failures = new Array<string>()

        this.validation.forEach(validation=>{
            validation.Validate(this.props.CurrentState,this.failures)
        })

        this.props.CanSave(this.failures.length === 0)
    }
    public render() {
        this.Validate()//之所以这么做，是因为每当父组件的状态发生变化时，就会调用渲染周期
        const errors = this.failures.map(function it(failure) {
            return (<Row key={failure}><Col><label>{failure}</label></Col></Row>)
        })
        return (<Col>{errors}</Col>);
    }
}
























