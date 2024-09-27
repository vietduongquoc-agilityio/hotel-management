import React from "react";

export default function FormSubmit() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
  }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Info</h1>
      <label>
        My name is <input name="myInput" defaultValue={"VietDuong"} />
      </label>
      <label>
        Choose <input type="checkbox" name="myCheckBox" defaultChecked={true} />
      </label>
      <p>
        Your favorites
        <label>
          <input type="radio" name="myRadio" value="option1" />
          swimming
        </label>
        <label>
          <input
            type="radio"
            name="myRadio"
            value="option2"
            defaultChecked={true}
          />
          play soccer
        </label>
        <label>
          <input type="radio" name="myRadio" value="option3" />
          dancing
        </label>
      </p>
      <button type="reset">Reset Form</button>
      <button type="submit">Submit Form</button>
    </form>
  );
}
