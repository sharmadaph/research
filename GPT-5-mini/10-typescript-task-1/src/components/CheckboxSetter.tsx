import React from 'react';

export type CheckboxSetterProps = {
  value?: boolean;
  onChange?: (value: boolean | undefined) => void;
  label?: string;
};

export const CheckboxSetter: React.FC<CheckboxSetterProps> = ({ value, onChange, label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label>
      <input type="checkbox" checked={!!value} onChange={handleChange} /> {label}
    </label>
  );
};

export default CheckboxSetter;
