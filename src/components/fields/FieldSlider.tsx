import { useEffect } from 'react';

import Input from '../base/Input';
import RangeSlider, { RangeSliderProps } from '../base/RangeSlider';
import FieldLabel, { FieldLabelProps } from './FieldLabel';

export type FieldSliderProps = RangeSliderProps &
  FieldLabelProps & {
    className?: string;
    inputClassName?: string;
    sliderClassName?: string;
    onChange: (value: number) => void;
  };

export default function FieldSlider({
  label,
  tooltip,
  placement,
  min,
  max,
  value,
  id,
  step,
  className = '',
  inputClassName = '',
  sliderClassName = '',
  onChange,
}: FieldSliderProps) {
  useEffect(() => {
    const _min = typeof min === 'string' ? parseFloat(min) : min;
    const _max = typeof max === 'string' ? parseFloat(max) : max;

    if (value < _min) {
      onChange(_min);
    } else if (value > _max) {
      onChange(_max);
    }
  }, [value, min, max, onChange]);

  return (
    <div className={`flex flex-col items-start space-y-2 ${className}`}>
      <FieldLabel label={label} tooltip={tooltip} placement={placement} />
      <div className="self-start flex flex-row items-center space-x-4">
        <Input
          id={id}
          type={'number'}
          className={`ml-0.5 w-20 ${inputClassName}`}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          step={step}
        />
        <RangeSlider
          id={id}
          value={value}
          onChange={onChange}
          className={`w-36 ml-0.5 ${sliderClassName}`}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}
