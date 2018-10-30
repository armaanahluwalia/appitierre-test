import React from 'react';

/** 
 * Component that renders a checkbox
 * @prop id - An id for the checkbox
**/
class CheckboxComponent extends React.Component {
    render() {
        const checkboxId = `checkbox-${this.props.id}`;
        return (
        <div className="checkbox-container">
            <input 
            type="checkbox" 
            name={checkboxId} 
            onChange={(e) => this.props.onChange(e, this.props.id)}
            id={checkboxId}
            className="checkbox-input"
            />
            <label htmlFor={checkboxId}>Item {this.props.id}</label>
        </div>
        )
    }
};

export default CheckboxComponent;