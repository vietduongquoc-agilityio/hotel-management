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
}

export default function Select({
  options,
  onChange,
  value,
  label,
  width,
}: SelectProps) {
  const style = {
    width: `${width}px`,
  };
  return (
    <div className="select-container" style={style}>
      {label && <label className="select-label">{label}</label>}
      <select
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
