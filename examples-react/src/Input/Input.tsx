export default function Input() {
  return (
    <>
      <label>
        My name is <input name="myInput" />
      </label>
      <hr />
      <label>
        choose <input type="checkbox" name="myCheckBox" />
      </label>
      <p>
        Button Radio
        <label>
          <input type="radio" name="myRadio" id="" value="option1" />
          Option1
        </label>
        <label>
          <input type="radio" name="myRadio" id="" value="option2" />
          Option2
        </label>
        <label>
          <input type="radio" name="myRadio" id="" value="option3" />
          Option3
        </label>
      </p>
    </>
  );
}
