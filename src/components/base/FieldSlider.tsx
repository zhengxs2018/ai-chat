import { useEffect } from 'react';
import { Placement } from 'tippy.js';

import FieldLabel from './FieldLabel';
import Input from './Input';
import RangeSlider from './RangeSlider';

export interface FieldSliderProps {
  text: string;
  helpText?: string;
  helpPlacement?: Placement;
  value: number;
  id?: string;
  min: string;
  max: string;
  step: string;
  className?: string;
  inputClassName?: string;
  sliderClassName?: string;
  onChange: (value: number) => void;
}

export default function FieldSlider({
  text,
  value,
  id,
  min,
  max,
  step,
  helpText,
  helpPlacement = 'top',
  className = '',
  inputClassName = '',
  sliderClassName = '',
  onChange,
}: FieldSliderProps) {
  useEffect(() => {
    if (value < parseFloat(min)) {
      onChange(parseFloat(min));
    } else if (value > parseFloat(max)) {
      onChange(parseFloat(max));
    }
  }, [value, min, max, onChange]);

  return (
    <div className={`flex flex-col items-start space-y-2 ${className}`}>
      <FieldLabel
        text={text}
        helpText={helpText}
        helpPlacement={helpPlacement}
      />
      <div className="self-start flex flex-row items-center space-x-4">
        <Input
          id={id}
          type={'number'}
          className={`ml-0.5 w-20 ${inputClassName}`}
          value={value.toString()}
          placeholder={value.toString()}
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
