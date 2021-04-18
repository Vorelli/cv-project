import React, { Component } from 'react';
import educationFields from '../data/educationFields';
import experienceFields from '../data/experienceFields';
import personalInfoFields from '../data/personalInfoFields';
import FieldsDisplayer from './FieldsDisplayer';
import CvPreview from './CvPreview';
import ReactToPrint from 'react-to-print';

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
      // initialize multiple inputs with 3 rather than 1 as it's
      // easier to delete rather than create and i feel like 3 is
      // a good middleground.
      values[fields[i].class] = fields[i].multipleInputs ? ['', '', ''] : '';
    }
    return values;
  }

  handleChange(fieldName, indexOfField, event, valueProperties) {
    const { multipleInputs, index, className } = valueProperties;
    const value = event.target.value;
    event.preventDefault();

    this.setState((state) => {
      if (multipleInputs) {
        state.values[fieldName][indexOfField][className][index] = value;
      } else {
        state.values[fieldName][indexOfField][className] = value;
      }
      return state;
    });
  }

  addField(fieldsName) {
    this.setState((state) => {
      const { fields } = this.state.fields[fieldsName];
      const emptyFieldInfo = this.createEmptyFieldInfo(fields);
      state.values[fieldsName].push(emptyFieldInfo);
      return state;
    });
  }

  deleteField(fieldName, fieldIndex) {
    this.setState((state) => {
      state.values[fieldName].splice(fieldIndex, 1);
      return state;
    });
  }

  addEntry(fieldName, fieldIndex, entryName) {
    this.setState((state) => {
      state.values[fieldName][fieldIndex][entryName].push('');
      return state;
    });
  }

  deleteEntry(fieldName, fieldIndex, entryName, entryIndex) {
    this.setState((state) => {
      state.values[fieldName][fieldIndex][entryName].splice(entryIndex, 1);
      return state;
    });
  }

  generateCV(ref) {
    useReactToPrint({ content: () => ref.current });
  }

  render() {
    const refForPrinting = React.createRef();

    return (
      <div className='app'>
        <h1>CV Generator</h1>
        <FieldsDisplayer
          fieldsInfo={this.state.values}
          fields={this.state.fields}
          handleInput={this.handleChange.bind(this)}
          deleteSingular={this.deleteField.bind(this)}
          addEntry={this.addEntry.bind(this)}
          addField={this.addField.bind(this)}
          deleteEntry={this.deleteEntry.bind(this)}
        />
        <ReactToPrint
          trigger={() => (
            <button
              type='button'
              className='generate'
              onClick={this.generateCV.bind(this, refForPrinting)}
            >
              Print CV
            </button>
          )}
          content={() => refForPrinting.current}
        />
        <CvPreview values={this.state.values} ref={refForPrinting} />
      </div>
    );
  }
}
