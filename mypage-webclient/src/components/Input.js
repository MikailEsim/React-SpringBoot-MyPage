import React from 'react';

const Input = (props) => {
    const { type, name, label, error, onChange } = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div className="form-group">
            <label>{label}</label>
            <input className={className} type={type} name={name} onChange={onChange} />
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}

export default Input;