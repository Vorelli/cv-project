import React, { Component } from 'react';
import Fields from './Fields';

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        { class: 'firstName', label: 'First Name' },
        { class: 'lastName', label: 'Last Name' },
        { class: 'phoneNumber', label: 'Phone Number:', type: 'tel' },
        { class: 'email', label: 'Email Address:', type: 'email' },
        { class: 'address', label: 'Physical Address:' },
        {
          class: 'areasOfExpertise',
          label: 'Areas of Expertise',
          multipleInputs: true,
        },
      ],
    };
  }

  render() {
    return (
      <div className='personalInfo'>
        <div className='header'>
          <h1 key={'heading'}>Personal Info</h1>
        </div>
        <Fields
          fieldInfo={this.props.fieldInfo}
          fields={this.state.fields}
          editing={this.state.editing}
          saveEdit={this.props.saveEdit.bind(this)}
        />
      </div>
    );
  }
}
