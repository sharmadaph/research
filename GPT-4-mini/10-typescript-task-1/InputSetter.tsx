import React from 'react';

type InputSetterProps = {
  value?: string;
  onChange?: (value?: string) => void;
};

const InputSetter: React.FC<InputSetterProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return <input type="text" value={value} onChange={handleChange} />;
};

export default InputSetter;