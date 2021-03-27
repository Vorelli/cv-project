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
      ],
    };
  }

  saveEdit(tempValues) {
    this.props.saveEdit(tempValues);
  }

  render() {
    return (
      <div className='personalInfo'>
        <h1 key={'heading'}>Personal Info</h1>
        <Fields
          personalInfo={this.props.personalInfo}
          fields={this.state.fields}
          editing={this.state.editing}
          saveEdit={this.saveEdit.bind(this)}
        />
      </div>
    );
  }
}
