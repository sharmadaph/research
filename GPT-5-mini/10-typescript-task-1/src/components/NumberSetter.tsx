import React from 'react';

export type NumberSetterProps = {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
};

export const NumberSetter: React.FC<NumberSetterProps> = ({ value, onChange, min, max }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange?.(v === '' ? undefined : Number(v));
  };

  return (
    <input
      type="number"
      value={value ?? ''}
      onChange={handleChange}
      min={min}
      max={max}
    />
  );
};

export default NumberSetter;
