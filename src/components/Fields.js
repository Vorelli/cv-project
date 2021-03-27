import React, { Component } from 'react';

export default class Fields extends Component {
  constructor(props) {
    super(props);
    const tempValues = Object.fromEntries(
      props.fields.map((value, index) => [value.class, ''])
    );
    console.log(tempValues);
    this.state = { tempValues, editing: true };
  }

  handleChange(event) {
    this.setState((state, _) => {
      const tempValues = state.tempValues;
      tempValues[event.target.className] = event.target.value;
      return { tempValues };
    });
  }

  saveEdit(event) {
    this.props.saveEdit(this.state.tempValues);
    this.setState({ editing: false });
  }

  startEditing(event) {
    this.setState({ editing: true });
  }

  render() {
    const displayedFields = this.props.fields.map((field) => {
      const label = <label htmlFor={field.class}>{field.label}</label>;
      let inputOrDisplay;
      if (this.state.editing)
        inputOrDisplay = (
          <input
            className={field.class}
            name={field.class}
            onChange={this.handleChange.bind(this)}
            value={this.state.tempValues[field.class]}
            type={field.type || 'text'}
          />
        );
      else
        inputOrDisplay = (
          <div className={field.class} key={field.class + ':' + 'div'}>
            {this.props.personalInfo[field.class]}
          </div>
        );

      const singularField = (
        <div className='field' key={field.class + ':' + field.label}>
          {label}
          {inputOrDisplay}
        </div>
      );
      return singularField;
    });

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
        </div>
      </div>
    );
  }
}
