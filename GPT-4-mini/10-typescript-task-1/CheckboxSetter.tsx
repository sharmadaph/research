import React from 'react';

type CheckboxSetterProps = {
  value?: boolean;
  onChange?: (value?: boolean) => void;
};

const CheckboxSetter: React.FC<CheckboxSetterProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.checked);
    }
  };

  return <input type="checkbox" checked={value} onChange={handleChange} />;
};

export default CheckboxSetter;