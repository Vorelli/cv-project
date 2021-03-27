import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      personalInfo: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        address: '',
      },
      education: [],
      experience: [],
    };
  }

  save(name, data) {
    this.setState((state) => {
      state[name] = data;
      return state;
    });
  }

  render() {
    return (
      <div className='app'>
        <PersonalInfo
          personalInfo={this.state.personalInfo}
          saveEdit={this.save.bind(this, 'personalInfo')}
        />
        <Experience />
        <Education />
      </div>
    );
  }
}
