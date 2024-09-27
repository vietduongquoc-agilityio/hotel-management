import { useState } from "react";

function MyFormSelectVegetables() {
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([
    "corn",
    "tomato",
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedVegetables(values);
  };

  return (
    <form>
      <label>
        Choose all your favorite vegetables:
        <select
          multiple={true}
          value={selectedVegetables}
          onChange={handleChange}
        >
          <option value="cucumber">Cucumber</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
      </label>
      <p>Your favorite vegetable is: {selectedVegetables.join(", ")}</p>
    </form>
  );
}

export default MyFormSelectVegetables;