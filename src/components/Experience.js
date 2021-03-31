import React, { Component } from 'react';
import Fields from './Fields';

export default class Experience extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: [
        { class: 'jobTitle', label: 'Job Title:' },
        { class: 'company', label: 'Company:' },
        { class: 'startMonth', label: 'Start Month:' },
        { class: 'startYear', label: 'Start Year:' },
        { class: 'endMonth', label: 'End Month (N/A if presently employed):' },
        { class: 'endYear', label: 'End Year (N/A if presently employed):' },
        { class: 'oneLineSummary', label: 'One line sumamry:' },
        {
          class: 'responsibilities',
          label: 'Responsibilities (3-5 reccomended):',
          multipleInputs: true,
        },
      ],
    };

    this.addExperience();
  }

  deleteSingular(index) {
    const temp = this.props.fieldInfo
      .slice(0, index)
      .concat(this.props.fieldInfo.slice(index + 1));
    this.props.saveEdit(temp);
  }

  saveSingular(index, tempValues) {
    console.log('the index is: ' + index);
    const currentValuesUpdated = this.props.fieldInfo;
    currentValuesUpdated[index] = tempValues;
    console.log(index, tempValues);
    this.props.saveEdit(currentValuesUpdated);
  }

  addExperience() {
    const emptyExperience = {
      jobTitle: '',
      company: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      oneLineSummary: '',
      responsibilities: [''],
    };
    console.log(emptyExperience);
    let newObj = this.props.fieldInfo.concat(emptyExperience);
    console.log(newObj);
    this.props.saveEdit(newObj);
  }

  addEntry(index, name) {
    const temp = this.props.fieldInfo;
    temp[index][name].push('');
    this.props.saveEdit(temp);
  }

  render() {
    const fieldsList = this.props.fieldInfo.map((field, index) => {
      console.log(index);
      return (
        <Fields
          fields={this.state.fields}
          saveEdit={this.saveSingular.bind(this, index)}
          fieldInfo={field}
          key={index + field}
          index={index}
          array={true}
          deleteSingular={this.deleteSingular.bind(this, index)}
          addEntry={this.addEntry.bind(this, index)}
          parent='workExperience'
        />
      );
    });

    return (
      <div className='workExperience'>
        <div className='header'>
          <h1>Work Experience</h1>
        </div>
        {fieldsList}
        <button type='button' onClick={this.addExperience.bind(this)}>
          Add Work Experience
        </button>
      </div>
    );
  }
}
