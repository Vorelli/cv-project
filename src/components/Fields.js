import React, { Component } from 'react';

export default class Fields extends Component {
  constructor(props) {
    super(props);
    const tempValues = Object.fromEntries(
      props.fields.map((value, index) => [
        value.class,
        value.multipleInputs ? [''] : '',
      ])
    );

    this.state = { tempValues, editing: true };
  }

  handleChange(event, index, multipleInputs) {
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
    });
  }

  saveEdit(event) {
    this.props.saveEdit(this.state.tempValues);
    console.log(this.state.tempValues);
    this.setState({ editing: false });
  }

  startEditing(event) {
    this.setState({ editing: true });
  }

  makeInput(className, type = 'text', index, multipleInputs) {
    console.log(this.state.tempValues[className]);

    return (
      <input
        className={className}
        name={className}
        onChange={(event) => this.handleChange(event, index, multipleInputs)}
        value={
          multipleInputs
            ? this.state.tempValues[className][index]
            : this.state.tempValues[className]
        }
        type={type}
      />
    );
  }

  makeDisplay(className, index, multipleInputs) {
    return (
      <div className={className} key={className + ':div'}>
        {multipleInputs
          ? this.props.fieldInfo[className][index]
          : this.props.fieldInfo[className]}
      </div>
    );
  }

  render() {
    const displayedFields = this.props.fields.map((field) => {
      const numInputDisplays = field.multipleInputs
        ? Math.max(1, this.props.fieldInfo[field.class].length)
        : 1;
      if (field.class == 'responsibilities') {
        console.log(this.props.fieldInfo[field.class].length);
        console.log(field.multipleInputs);
        console.log(numInputDisplays);
      }
      const fields = [];
      for (let i = 0; i < numInputDisplays; i++) {
        const label = (
          <label htmlFor={field.class}>{i == 0 ? field.label : ''}</label>
        );
        let inputOrDisplay;
        if (this.state.editing)
          inputOrDisplay = this.makeInput(
            field.class,
            field.type,
            i,
            field.multipleInputs
          );
        else
          inputOrDisplay = this.makeDisplay(
            field.class,
            i,
            field.multipleInputs
          );

        const singularField = (
          <div className='field' key={field.class + ':' + field.label + i}>
            {label}
            {inputOrDisplay}
          </div>
        );

        fields.push(singularField);
      }

      if (field.multipleInputs) {
        fields.push(
          <button
            type='button'
            onClick={
              this.props.addEntry
                ? this.props.addEntry.bind(this, field.class)
                : null
            }
            key='addButton'
          >
            {'Add ' + field.label}
          </button>
        );
      }

      return fields;
    });

    const del = this.props.array ? (
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
