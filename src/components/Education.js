import React, { Component } from 'react';
import Fields from './Fields';

export default class Education extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        { class: 'school', label: 'School:' },
        { class: 'degree', label: "Degree (Associate's/Bachelor's):" },
        { class: 'fieldOfStudy', label: 'Field of study:' },
        { class: 'startMonth', label: 'Start Month:' },
        { class: 'startYear', label: 'Start Year:' },
        {
          class: 'endMonth',
          label: 'End Month (Or expected graduation year):',
        },
        {
          class: 'endYear',
          label: 'End Year (Or expected graduation year):',
        },
      ],
    };

    this.addEducation();
  }

  deleteSingular(index) {
    const temp = this.props.fieldInfo
      .slice(0, index)
      .concat(this.props.fieldInfo.slice(index + 1));
    this.props.saveEdit(temp);
  }

  saveSingular(index, tempValues) {
    const temp = this.props.fieldInfo;
    temp[index] = tempValues;
    this.props.saveEdit(temp);
  }

  addEducation() {
    const emptyEducation = {
      school: '',
      degree: '',
      fieldOfStudy: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
    };

    this.props.saveEdit(this.props.fieldInfo.concat(emptyEducation));
  }

  render() {
    const educationFields = this.props.fieldInfo.map((field, index) => {
      return (
        <Fields
          fields={this.state.fields}
          saveEdit={this.saveSingular.bind(this, index)}
          fieldInfo={field}
          key={index + field}
          array={true}
          deleteSingular={this.deleteSingular.bind(this, index)}
        />
      );
    });

    return (
      <div className='education'>
        <div className='header'>
          <h1>Education History</h1>
        </div>
        {educationFields}
        <div className='addButton'>
          <button type='button' onClick={this.addEducation.bind(this)}>
            Add Education
          </button>
        </div>
      </div>
    );
  }
}
