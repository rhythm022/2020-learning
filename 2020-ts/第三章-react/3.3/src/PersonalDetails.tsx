import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import {IPersonState} from "./State";//规范既不在父组件也不在子组件，在第三方


interface IProps {
    DefaultState:IPersonState
}


export default class PersonalDetails extends React.Component<IProps,IPersonState> {// 为属性和状态建立规范

    private  defaultState:Readonly<IPersonState>;
    constructor(props:IProps) {
        super(props);
        //这里做了两个工作。首先，设置了必要时可以返回到的默认状态，这个状态来自父组件；其次，我们设置了这个页面的状态。
        this.defaultState = props.DefaultState
        this.state = props.DefaultState
    }

    private updateBinding = (event:any)=>{
        switch (event.target.id) {

            case `firstName`:
                this.setState({FirstName:event.target.value})
                break;
            case `lastName`:
                this.setState({LastName:event.target.value})
                break;
        }
    }
    public render() {
        return (
            <Row>
                <Col lg="8">
                    <Row>
                        <Col><h4 className="mb-3">Personal details</h4></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="firstName">First name</label></Col>
                        <Col><label htmlFor="lastName">Last name</label></Col>
                    </Row>
                    <Row>
                        <Col>
                            <input type="text" id="firstName" className="form-control" onChange={this.updateBinding} value={this.state.FirstName} placeholder="First name"/>
                        </Col>
                        <Col>
                            <input type="text" id="lastName" className="form-control" onChange={this.updateBinding} value={this.state.LastName} placeholder="Last name"/>
                        </Col>
                    </Row>
                    ... Code omitted for brevity

                    <Row>
                        <Col lg="3"><label htmlFor="postcode">Postal/ZipCode</label></Col>
                        <Col lg="4"><label htmlFor="phoneNumber">Phone number</label></Col>
                    </Row>
                    <Row>
                        <Col lg="3"><input type="text" id="postcode" className="form-control"/></Col>
                        <Col lg="4"><input type="text" id="phoneNumber" className="form-control"/></Col>
                    </Row>
                </Col>


                <Col>
                    <Row>
                        <Col lg="6"><Button size="lg" color="success">Load</Button></Col>
                        <Col lg="6"><Button size="lg" color="info">NewPerson</Button></Col>
                    </Row>
                </Col>
            </Row>);
    }
}









































