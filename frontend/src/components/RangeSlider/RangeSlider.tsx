import "./rangeSlider.css";

interface RangeSliderProps {
  label: string;
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  defaultValue?: number;
}

export default function RangeSlider({
  label,
  min,
  max,
  minLabel,
  maxLabel,
  defaultValue = 0,
}: RangeSliderProps) {
  return (
    <div className="flex flex-col w-full gap-3">
      <h4 className="text-[#484848] font-semibold mb-3">{label}</h4>

      <input
        type="range"
        min={min}
        max={max}
        defaultValue={defaultValue}
        className="w-full"
      />

      <div className="flex justify-between text-sm text-[#484848] mt-2">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
