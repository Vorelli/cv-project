import React from 'react';
import Fields from './Fields';

// what does this class do?
// it will take in all of the fieldsInfo
// and spit back out enough fields objects and divs to display them
// while passing the handle input back up to app

export default function FieldsDisplayer(props) {
  const fieldInfosKeys = Object.keys(props.fieldsInfo).reverse();
  const fields = fieldInfosKeys.map((fieldInfoKey) => {
    const fields = props.fieldsInfo[fieldInfoKey].map((fieldInd, index) => {
      return (
        <Fields
          key={fieldInfoKey + index}
          fieldInfo={fieldInd}
          handleInput={props.handleInput.bind(this, fieldInfoKey, index)}
          fieldsTotal={props.fields[fieldInfoKey]}
          multipleFields={props.fields[fieldInfoKey].multipleValues}
          deleteSingular={props.deleteSingular.bind(this, fieldInfoKey, index)}
          fields={props.fields[fieldInfoKey].fields}
          addEntry={props.addEntry.bind(this, fieldInfoKey, index)}
          deleteEntry={props.deleteEntry.bind(this, fieldInfoKey, index)}
        />
      );
    });
    const addButtonLabel = `Add ${props.fields[fieldInfoKey].header.slice(
      0,
      props.fields[fieldInfoKey].header.length - 1
    )}`;
    const addButtonFunction = props.addField.bind(this, fieldInfoKey);

    return (
      <div className={fieldInfoKey} key={fieldInfoKey}>
        <div className='header'>
          <h2>{props.fields[fieldInfoKey].header}</h2>
        </div>
        {fields}
        {props.fields[fieldInfoKey].multipleValues && (
          <button type='button' onClick={addButtonFunction}>
            {addButtonLabel}
          </button>
        )}
      </div>
    );
  });
  return fields;
}
