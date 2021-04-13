import React from 'react';
import Fields from './Fields';

// what does this class do?
// it will take in all of the fieldsInfo
// and spit back out enough fields objects and divs to display them
// while passing the handle input back up to app

export default function FieldsDisplayer(props) {
  const fieldInfosKeys = Object.keys(props.fieldsInfo);
  console.log(props.fields);
  const fields = fieldInfosKeys.map((fieldInfoKey) => {
    const fields = props.fieldsInfo[fieldInfoKey].map((fieldInd, index) => {
      return (
        <Fields
          fieldInfo={fieldInd}
          handleInput={props.handleInput.bind(this, fieldInfoKey, index)}
          multipleFields={props.fields[fieldInfoKey].multipleValues}
          deleteSingular={props.deleteSingular.bind(this)}
          fields={props.fields[fieldInfoKey].fields}
          addEntry={props.addEntry.bind(this)}
        />
      );
    });
    return (
      <div className={fieldInfoKey}>
        <div className='header'>
          <h2>{props.fields[fieldInfoKey].header}</h2>
        </div>
        {fields}
        {props.fields[fieldInfoKey].multipleValues && (
          <button
            type='button'
            onClick={props.addField.bind(this, fieldInfoKey)}
          >
            {`Add ${props.fields[fieldInfoKey].header.slice(
              0,
              props.fields[fieldInfoKey].header.length - 1
            )}`}
          </button>
        )}
      </div>
    );
  });
  return fields;
}

/*
export default class FieldDisplayer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className='header'>
          <h2 key={'heading'}>{this.props.header}</h2>
        </div>
        <Fields
          fieldInfo={this.props.fieldInfo}
          fields={this.state.fields}
          handleChange={this.props.handleChange.bind(this)}
        />
      </div>
    );
  }
}
*/
