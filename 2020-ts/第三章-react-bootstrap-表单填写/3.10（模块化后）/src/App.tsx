import * as React from 'react';
import './App.css';
import Container from 'reactstrap/lib/Container';
import PersonalDetails from './PersonalDetails';
import {IPersonState} from "./State";
export default class App extends React.Component {
    private defaultPerson:IPersonState = {// 默认值在父组件定义在传给子组件，为什么？？
        PersonId:'',
        FirstName:'',
        LastName:'',
        Address1:'',
        Address2:'',
        Town:'',
        Country:'',
        PhoneNumber:'',
        Postcode:'',
        DateOfBirth:new Date().toISOString().substring(0,10),
    }

  public render() {
    return (
        <Container>
          <PersonalDetails DefaultState={this.defaultPerson}/>
        </Container>
    );
  }
}
