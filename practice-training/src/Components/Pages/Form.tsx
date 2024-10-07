import React, { useState } from "react";

export interface FormProps {
  onSubmit: (formData: Record<string, string>) => void;
  size?: "md" | "lg" | "sm";
  borderRadius?: number;
  width?: string;
}

const Form: React.FC<FormProps> = ({
  onSubmit,
  size = "md",
  borderRadius = 5,
  width = "100%",
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const formStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: `${borderRadius}px`,
    width,
    size
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
