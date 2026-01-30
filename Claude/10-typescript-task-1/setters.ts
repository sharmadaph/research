// InputSetter: handles string values
class InputSetter {
  value: string;
  onChange?: (value: string | undefined) => void;

  constructor(value: string = '', onChange?: (value: string | undefined) => void) {
    this.value = value;
    this.onChange = onChange;
  }

  setValue(newValue: string): void {
    this.value = newValue;
    if (this.onChange) {
      this.onChange(newValue);
    }
  }
}

// NumberSetter: handles number values
class NumberSetter {
  value: number;
  onChange?: (value: number | undefined) => void;

  constructor(value: number = 0, onChange?: (value: number | undefined) => void) {
    this.value = value;
    this.onChange = onChange;
  }

  setValue(newValue: number): void {
    this.value = newValue;
    if (this.onChange) {
      this.onChange(newValue);
    }
  }
}

// CheckboxSetter: handles boolean values
class CheckboxSetter {
  value: boolean;
  onChange?: (value: boolean | undefined) => void;

  constructor(value: boolean = false, onChange?: (value: boolean | undefined) => void) {
    this.value = value;
    this.onChange = onChange;
  }

  setValue(newValue: boolean): void {
    this.value = newValue;
    if (this.onChange) {
      this.onChange(newValue);
    }
  }
}

export { InputSetter, NumberSetter, CheckboxSetter };
