import React from 'react';

type NumberSetterProps = {
  value?: number;
  onChange?: (value?: number) => void;
};

const NumberSetter: React.FC<NumberSetterProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value ? parseFloat(event.target.value) : undefined;
    if (onChange) {
      onChange(newValue);
    }
  };

  return <input type="number" value={value} onChange={handleChange} />;
};

export default NumberSetter;