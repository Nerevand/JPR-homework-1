import React from 'react';
import PropTypes from 'prop-types';

import './style.scss'

export default function CustomInput(props) {
  const { heading, type, placeholder, refs, error, pattern, onBlur, onChange, value } = props;

  return (
    <div className="form-group">
      <h4 className="heading">{heading}</h4>
      <input
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        ref={refs}
        onChange={onChange}
        defaultValue={value ? value : ''}
        onBlur={onBlur} />
      <p className='form-error'>{error}</p>
    </div>
  )
}

CustomInput.propTypes = {
  heading: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  refs: PropTypes.object,
  error: PropTypes.string,
  pattern: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};