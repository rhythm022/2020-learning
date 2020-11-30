import * as React from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import {IPersonState} from "./State";//规范既不在父组件也不在子组件，在第三方
import FormValidation from './FormValidation'
import {PersonRecord} from "./Types";
import {IRecordState, RecordState} from "./RecordState";
import {PersonalDetailsTableBuilder} from "./PersonalDetailsTableBuilder";
import {Database} from "./Database/Database";
import {People} from "./People";


interface IProps {
    DefaultState: IPersonState
}


// ★★★ 组件和数据库交互的关键是理解people和person/state的流动
// 一开始，没有People只有person/state，组件把person/state给数据库，加入到数据库记录列表中
// 这样后，组件再从数据库得到Person列表，加载到自己这儿为People，并映射到界面上
// People中被选中的person成为state，组件拿着state与数据库交互。
// ★★★ 组件把数据库数据加载到自己people这儿，到再一次从数据库更新people前，people是readonly的
// ★★★★★ 这样之后，就造成了现在push-pull的模式
export default class PersonalDetails extends React.Component<IProps, IPersonState> {// 为属性和状态建立规范
    private canSave: boolean = false;
    private defaultState: Readonly<IPersonState>;
    private readonly dataLayer:Database<PersonRecord>
    private people:IPersonState[] = []
    private peopleCon :People
    constructor(props: IProps) {
        super(props);
        // 储存必要时可以重置的默认信息
        // 储存这个页面的信息
        // 所有的存储信息都是为了传递信息。★★★传递信息完全依赖于函数调用
        this.defaultState = props.DefaultState
        this.state = props.DefaultState

        const tableBuilder:PersonalDetailsTableBuilder = new PersonalDetailsTableBuilder()
        this.dataLayer = new Database(tableBuilder.Build())


        this.peopleCon = new People()
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
        if(this.people.length){
            const copyThis = this
            people = this.people.map(function it(p) {
                return (
                    <Row key={p.PersonId}>
                        <Col lg="6"><label>{p.FirstName} {p.LastName}</label></Col>
                        <Col lg="3"><Button value={p.PersonId} color="link" onClick={copyThis.setActive}>Edit</Button></Col>
                        <Col lg="3"><Button value={p.PersonId} color="link" onClick={copyThis.delete}>Delete</Button></Col>
                    </Row>
                )

            },this)
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

    private clear = ()=>{
        this.setState(this.defaultState)
    }


    private setActive = (event:any) =>{// 进入编辑状态
        const person:string = event.target.value

        // person的查询逻辑是否应该有专门People处理？？
        const state = this.people.find((element:IPersonState)=>element.PersonId === person)
        if(state)
            this.setState(state)
    }

    private delete = (event:any)=>{
        const person:string = event.target.value
        this.DeletePerson(person)
    }

    private async DeletePerson(person:string){//软删除：设置该数据库记录为no active
        const foundPerson = this.people.find((element:IPersonState)=>element.PersonId === person)
        if(!foundPerson) return

        const personState:IRecordState = new RecordState()
        personState.IsActive = false;
        const state: PersonRecord = {...foundPerson,...personState}

        await this.dataLayer.Update(state)

        this.loadPeople()
        this.clear()
    }

    private loadPeople = ()=>{
        this.people = new Array<PersonRecord>()
        this.dataLayer.Read().then(people=>{
            this.people = people
            this.setState(this.state)// 单纯触发更新页面???
        })
    }




    private savePerson = () =>{
        if(!this.canSave){
            alert(`输入信息有错误，无法保持`)
            return
        }
        const personState:IRecordState = new RecordState()
        personState.IsActive = true
        const state:PersonRecord = {...this.state,...personState}

        if(state.PersonId === ''){// 数据库中没有
            state.PersonId = Date.now().toString()
            this.dataLayer.Create(state)

            this.loadPeople()
            this.clear()

        }
        else{
            this.dataLayer.Update(state).then(()=> {
                this.loadPeople()
            })
        }
    }



}









































