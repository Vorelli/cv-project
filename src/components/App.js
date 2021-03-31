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
        areasOfExpertise: [''],
      },
      education: [],
      experience: [],
    };
  }

  save(name, data) {
    this.setState(
      (state) => {
        state[name] = data;
        console.log(data);
        return state;
      },
      () => console.log(this.state[name])
    );
  }

  render() {
    return (
      <div className='app'>
        <PersonalInfo
          fieldInfo={this.state.personalInfo}
          saveEdit={this.save.bind(this, 'personalInfo')}
        />
        <Experience
          fieldInfo={this.state.experience}
          saveEdit={this.save.bind(this, 'experience')}
        />
        <Education
          fieldInfo={this.state.education}
          saveEdit={this.save.bind(this, 'education')}
        />
      </div>
    );
  }
}
