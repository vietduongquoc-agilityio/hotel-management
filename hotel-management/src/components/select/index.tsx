import "./index.css";

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  onChange: (value: string) => void;
  value: string;
  label?: string;
  width?: number;
  height?: number;
  padding?: number;
}

export default function Select({
  options,
  onChange,
  value,
  label,
  width,
  height,
  padding,
}: SelectProps) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
    padding: `${padding}`,
  };
  return (
    <div className="select-container">
      {label && <label className="select-label">{label}</label>}
      <select
        style={style}
        className="select-element"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
