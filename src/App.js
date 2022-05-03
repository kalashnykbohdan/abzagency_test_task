import './App.scss';
import React, { Component } from 'react';

import Header from './components/Header';
import Slid from './components/Slid';
import UsersList from './components/UserList';
import AddUser from './components/AddUser';

class App extends Component {
  state = {
    submitTrue: false,
  }

  submitUpdate = () =>{
    this.setState({
      submitTrue: !(this.state.submitTrue),
    })
  }

  render() {

    return (
      <main>
          <Header/>
          <Slid/>
          <UsersList submitTrueValue={this.state.submitTrue} onSubmitUpdate={this.submitUpdate}/>
          <AddUser submitTrue={this.submitUpdate}/>
      </main>
    );
  }
}

export default App;


