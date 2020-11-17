import {IPersonState} from "./State";
import * as React from "react";
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import {IValidation} from "./Validation/IValidation";
import {PersonValidation} from "./Validation/PersonValidation";
import {AddressValidation} from "./Validation/AddressValidation";
import {PhoneValidation} from "./Validation/PhoneValidation";


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
























