import React from 'react';

export type InputSetterProps = {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
};

export const InputSetter: React.FC<InputSetterProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange?.(v === '' ? undefined : v);
  };

  return <input value={value ?? ''} onChange={handleChange} placeholder={placeholder} />;
};

export default InputSetter;
