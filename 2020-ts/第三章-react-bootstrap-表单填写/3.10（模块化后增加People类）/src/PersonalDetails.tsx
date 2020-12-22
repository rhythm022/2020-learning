import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import {IPersonState} from "./State";//规范既不在父组件也不在子组件，在第三方
import FormValidation from './FormValidation'
import {People} from "./People";


interface IProps {
    DefaultState: IPersonState
}


// ★★★ 一般流程是信息push to service，pull from service，push to界面。再push to service循环。
// --- 比如一开始没有person，组件收集person传递给service，这样后，组件再从service保存一份最新的person，push to界面。
// --- 比如这里people中被选中的person是state，people不是state。
export default class PersonalDetails extends React.Component<IProps, IPersonState> {// 为属性和状态建立规范
    private canSave: boolean = false;
    private defaultState: Readonly<IPersonState>;
    private people: IPersonState[] = []
    private peopleService: People

    constructor(props: IProps) {
        super(props);
        // 储存必要时可以重置的默认信息。储存这个页面的信息。
        // 所有的收集、存储的信息都是为了传递信息。
        // ★★★传递信息完全依赖于函数调用
        this.defaultState = props.DefaultState
        this.state = props.DefaultState



        this.peopleService = new People()
    }

    private updateBinding = (event: any) => {
        switch (event.target.id) {

            case `firstName`:
                this.setState({FirstName: event.target.value})
                break;
            case `lastName`:
                this.setState({LastName: event.target.value})
                break;
            case `addr1`:
                this.setState({Address1: event.target.value})
                break;
            case `addr2`:
                this.setState({Address2: event.target.value})
                break;
            case `town`:
                this.setState({Town: event.target.value})
                break;
            case `country`:
                this.setState({Country: event.target.value})
                break;
            case `postcode`:
                this.setState({Postcode: event.target.value})
                break;
            case `phoneNumber`:
                this.setState({PhoneNumber: event.target.value})
                break;
            case `dateOfBirth`:
                this.setState({DateOfBirth: event.target.value})
                break;
        }
    }

    // 由子组件调用，专门组件向父组件传递消息
    private userCanSave = (hasErrors: boolean) => {
        this.canSave = hasErrors
    }

    public render() {
        let people = null
        if (this.people.length) {
            const copyThis = this
            people = this.people.map(function it(p) {
                return (
                    <Row key={p.PersonId}>
                        <Col lg="6"><label>{p.FirstName} {p.LastName}</label></Col>
                        <Col lg="3"><Button value={p.PersonId} color="link"
                                            onClick={copyThis.setActive}>Edit</Button></Col>
                        <Col lg="3"><Button value={p.PersonId} color="link"
                                            onClick={copyThis.delete}>Delete</Button></Col>
                    </Row>
                )

            }, this)
        }


        return (
            <Row>
                <Col lg="8">
                    <Row>
                        <Col><h4 className="mb-3">Personal details</h4></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col><label htmlFor="firstName">First name</label></Col>
                                <Col><label htmlFor="lastName">Last name</label></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col>
                                    <input type="text" id="firstName" className="form-control"
                                           value={this.state.FirstName} onChange={this.updateBinding}
                                           placeholder="First name"/>
                                </Col>
                                <Col><input type="text" id="lastName" className="form-control"
                                            value={this.state.LastName} onChange={this.updateBinding}
                                            placeholder="Last name"/></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="addr1">Address line 1</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="addr1" className="form-control" placeholder="Address line 1"
                                    value={this.state.Address1} onChange={this.updateBinding}/></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="addr2">Address line 2</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="addr2" className="form-control" placeholder="Address line 2"
                                    value={this.state.Address2!} onChange={this.updateBinding}/></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="town">Town</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="town" className="form-control" placeholder="Town"
                                    value={this.state.Town} onChange={this.updateBinding}/></Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="county">County</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="text" id="country" className="form-control" placeholder="County"
                                    value={this.state.Country} onChange={this.updateBinding}/></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col lg="3"><label htmlFor="postcode">Postal/ZipCode</label></Col>
                                <Col lg="4"><label htmlFor="phoneNumber">Phone number</label></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <Col lg="3"><input type="text" id="postcode" className="form-control"
                                                   value={this.state.Postcode} onChange={this.updateBinding}/></Col>
                                <Col lg="4"><input type="text" id="phoneNumber" className="form-control"
                                                   value={this.state.PhoneNumber} onChange={this.updateBinding}/></Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col><label htmlFor="dateOfBirth">Date of birth</label></Col>
                    </Row>
                    <Row>
                        <Col><input type="date" id="dateOfBirth" value={this.state.DateOfBirth!}
                                    onChange={this.updateBinding}/></Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button size="lg" color="primary" onClick={this.savePerson}>Save</Button>
                        </Col>
                        <Col>
                            <Button size="lg" color="secondary" onClick={this.clear}>Clear</Button>
                        </Col>
                    </Row>
                    <Row>
                        <FormValidation CurrentState={this.state} CanSave={this.userCanSave}/>
                    </Row>

                </Col>


                <Col>
                    <Row>
                        <Col>{people}</Col>
                    </Row>
                    <Row>
                        <Col lg="6"><Button size="lg" color="success" onClick={this.loadPeople}>Load</Button></Col>
                        <Col lg="6"><Button size="lg" color="info" onClick={this.clear}>NewPerson</Button></Col>
                    </Row>
                </Col>
            </Row>);
    }

    private clear = () => {
        this.setState(this.defaultState)
    }


    private setActive = (event: any) => {// 进入编辑状态
        const person: string = event.target.value

        // 该逻辑不属于peopleService处理
        const state = this.people.find((element:IPersonState)=>element.PersonId === person)
        if (state)
            this.setState(state)
    }

    private delete = (event: any) => {
        const person: string = event.target.value
        this.DeletePerson(person)
    }

    private async DeletePerson(person: string) {//软删除：设置该数据库记录为no active
        await this.peopleService.deletePerson(person)

        this.loadPeople()
        this.clear()
    }

    private loadPeople = () => {
        this.peopleService.loadPeople().then(() => {
            this.people = this.peopleService.getPeople()
            this.setState(this.state)// 触发更新页面

        })
    }


    private  savePerson = async() => {
        if (!this.canSave) {
            alert(`输入信息有错误，无法保持`)
            return
        }

        if (this.state.PersonId === '') {// 数据库中没有
            this.peopleService.createPerson(this.state)

            this.loadPeople()
            this.clear()

        } else {
            await this.peopleService.updatePerson(this.state)

            this.loadPeople()

        }
    }


}









































