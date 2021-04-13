import React, { Component } from 'react';

export default class Fields extends Component {
  constructor(props) {
    super(props);

    this.state = { editing: true };
  }

  handleChange(event, index, multipleInputs) {
    /*
    this.setState((state, _) => {
      let tempValues = state.tempValues;
      if (multipleInputs) {
        const arr = tempValues[event.target.className];
        arr[index] = event.target.value;
        tempValues[event.target.className] = arr;
      } else tempValues[event.target.className] = event.target.value;
      console.log(tempValues);
      state.tempValues = tempValues;
      return { state };
    }); */
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
    console.log(this.props.fields, this.props.fieldInfo);
    let displayedFields = [];
    for (let i = 0; i < this.props.fields.length; i++) {
      const key = this.props.fields[i].class;

      const numInputDisplays =
        1 ||
        (this.props.fields[i].multipleInputs &&
          this.props.fieldInfo[key].length);
      const fields = [];

      for (let j = 0; j < numInputDisplays; j++) {
        const label = <label>{j == 0 ? this.props.fields[i].label : ''}</label>;
        let inputOrDisplay;
        if (this.state.editing) {
          inputOrDisplay = this.makeInput(this.props.fields[i], j);
        } else {
          inputOrDisplay = this.makeDisplay(this.props.fields[i], j);
        }

        const singularField = (
          <div
            className='field'
            key={
              this.props.fieldInfo[key].class +
              ':' +
              this.props.fields[i].label +
              i
            }
          >
            {label}
            {inputOrDisplay}
          </div>
        );

        fields.push(singularField);
      }

      if (this.props.fields[i].multipleInputs) {
        fields.push(
          <button
            type='button'
            onClick={
              this.props.addEntry
                ? this.props.addEntry.bind(
                    this,
                    this.props.fieldInfo[key].class
                  )
                : null
            }
            key='addButton'
          >
            {'Add ' + this.props.fields[i].label}
          </button>
        );
      }

      displayedFields.push(fields);
    }

    /* const fieldKeys = Object.keys(this.props.fieldInfo);
    const displayedFields = fieldKeys.map((key) => {
      const numInputDisplays =
        1 || this.props.fieldInfo[this.props.fields[key].class].length;
      const fields = [];
      for (let i = 0; i < numInputDisplays; i++) {
        const label = (
          <label htmlFor={this.props.fields[key].class}>
            {i == 0 ? fieldInfo[key].label : ''}
          </label>
        );
        let inputOrDisplay;
        if (this.state.editing)
          inputOrDisplay = this.makeInput({
            className: fieldInfo[key].class,
            type: fieldInfo[key].type,
            index: i,
            multipleInputs: fieldInfo[key].multipleInputs,
          });
        else
          inputOrDisplay = this.makeDisplay({
            className: fieldInfo[key].class,
            index: i,
            multipleInputs: fieldInfo[key].multipleInputs,
          });

        const singularField = (
          <div
            className='field'
            key={fieldInfo[key].class + ':' + fieldInfo[key].label + i}
          >
            {label}
            {inputOrDisplay}
          </div>
        );

        fields.push(singularField);
      }

      if (fieldInfo[key].multipleInputs) {
        fields.push(
          <button
            type='button'
            onClick={
              this.props.addEntry
                ? this.props.addEntry.bind(this, fieldInfo[key].class)
                : null
            }
            key='addButton'
          >
            {'Add ' + fieldInfo[key].label}
          </button>
        );
      }

      return fields;
    }); */

    const del = this.props.multipleFields ? (
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
