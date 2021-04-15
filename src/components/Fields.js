import React, { Component } from 'react';

export default class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: true,
      fields: props.fieldsTotal.fields,
      multipleFields: props.fieldsTotal.multipleFields,
    };
  }

  saveEdit() {
    this.setState({ editing: false });
  }

  startEditing() {
    this.setState({ editing: true });
  }

  makeInput(inputProperties, index) {
    return (
      <input
        className={inputProperties.class}
        name={inputProperties.class}
        onChange={(event) =>
          this.props.handleInput(event, {
            index,
            multipleInputs: inputProperties.multipleInputs,
            className: inputProperties.class,
          })
        }
        value={
          inputProperties.multipleInputs
            ? this.props.fieldInfo[inputProperties.class][index]
            : this.props.fieldInfo[inputProperties.class]
        }
        type={inputProperties.type || 'text'}
      />
    );
  }

  makeDisplay(displayProperties, index) {
    const className = displayProperties.class;
    return (
      <div className={className} key={className + ':div'}>
        {displayProperties.multipleInputs
          ? this.props.fieldInfo[className][index]
          : this.props.fieldInfo[className]}
      </div>
    );
  }

  render() {
    let displayedFields = [];
    for (let i = 0; i < this.state.fields.length; i++) {
      const key = this.state.fields[i].class;

      let numInputDisplays = 1;
<<<<<<< HEAD
      if (this.state.fields[i].multipleInputs)
=======
      if (this.state.multipleInputs)
>>>>>>> 5e1c06110bb8b9e4a7e2ae25dd2c85de0da85dd5
        numInputDisplays = this.props.fieldInfo[key].length;
      const fields = [];

      for (let j = 0; j < numInputDisplays; j++) {
        const label = <label>{j == 0 ? this.state.fields[i].label : ''}</label>;
        let inputOrDisplay;
        if (this.state.editing) {
          inputOrDisplay = this.makeInput(this.state.fields[i], j);
        } else {
          inputOrDisplay = this.makeDisplay(this.state.fields[i], j);
        }

        fields.push(
          <div className='field' key={key + j}>
            {j > 0 ? (
              <button
                type='button'
                className='deleteEntry'
                onClick={this.props.deleteEntry.bind(this, key, j)}
              >
                Delete
              </button>
            ) : (
              label
            )}
            {inputOrDisplay}
          </div>
        );
      }

      if (this.state.fields[i].multipleInputs) {
        fields.push(
          <button
            type='button'
            onClick={
              this.props.addEntry ? this.props.addEntry.bind(this, key) : null
            }
            key='addButton'
          >
            {'Add ' + this.state.fields[i].label}
          </button>
        );
      }

      displayedFields.push(fields);
    }

    const del = this.state.multipleFields ? (
      <button type='button' onClick={this.props.deleteSingular.bind(this)}>
        Delete
      </button>
    ) : undefined;

    return (
      <div className='inputFields'>
        {displayedFields}
        <div className='saveEdit'>
          <button
            type='button'
            onClick={
              this.state.editing
                ? this.saveEdit.bind(this)
                : this.startEditing.bind(this)
            }
          >
            {this.state.editing ? 'Save' : 'Edit'}
          </button>
          {del}
        </div>
      </div>
    );
  }
}
