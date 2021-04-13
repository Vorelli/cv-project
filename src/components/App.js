import React, { Component } from 'react';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';
import educationFields from '../data/educationFields';
import experienceFields from '../data/experienceFields';
import personalInfoFields from '../data/personalInfoFields';
import FieldsDisplayer from './FieldsDisplayer';

export default class App extends Component {
  constructor(props) {
    super(props);
    const fields = {
      education: {
        fields: educationFields,
        multipleValues: true,
        header: 'Education:',
      },
      experience: {
        fields: experienceFields,
        multipleValues: true,
        header: 'Work Experience:',
      },
      personalInfo: {
        fields: personalInfoFields,
        multipleValues: false,
        header: 'Personal Info:',
      },
    };
    const fieldsKeys = Object.keys(fields);
    const values = {};
    fieldsKeys.forEach((key) => {
      const value = this.createEmptyFieldInfo(fields[key].fields);
      values[key] = [value];
    });

    this.state = {
      fields,
      values,
    };
  }

  createEmptyFieldInfo(fields) {
    let values = {};
    for (let i = 0; i < fields.length; i++) {
      console.log(fields[i]);
      console.log(fields[i].multipleInputs);
      values[fields[i].class] = fields[i].multipleInputs ? [''] : '';
      console.log(values[fields[i].class]);
    }
    return values;
  }

  addEducation() {
    this.setState((state) => {
      state.values.education.push(this.createEmptyFieldInfo(educationFields));
      return state;
    });
  }

  addExperience() {
    this.setState((state) => {
      state.values.experience.push(this.createEmptyFieldInfo(experienceFields));
      return state;
    });
  }

  handleChange(field, indexOfField, event, valueProperties) {
    console.log(this.state.values[field][indexOfField]);
    this.setState((state) => {
      if (valueProperties.multipleInputs) {
        state.values[field][indexOfField][valueProperties.className][
          valueProperties.index
        ] = event.target.value;
      } else {
        state.values[field][indexOfField][valueProperties.className] =
          event.target.value;
      }
      console.log(state.values, event.target.value);
      return state;
    });
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

  deleteSingular(a, b, c) {
    console.log(a, b, c);
  }

  addEntry(a, b, c) {
    console.log(a, b, c);
  }

  addField(a, b, c, d) {
    console.log(a, b, c, d);
  }

  render() {
    console.log(this.state);

    return (
      <div className='app'>
        <h1>CV Generator</h1>
        <FieldsDisplayer
          fieldsInfo={this.state.values}
          fields={this.state.fields}
          handleInput={this.handleChange.bind(this)}
          deleteSingular={this.deleteSingular.bind(this)}
          addEntry={this.addEntry.bind(this)}
          addField={this.addField.bind(this)}
        />
      </div>
    );
  }
}
