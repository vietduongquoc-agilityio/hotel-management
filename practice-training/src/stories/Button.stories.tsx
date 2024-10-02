import Button from "../components/Button";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {handleClick: {
    action: "handleClick"
  }}
};

const Template = (args) => <Button {...args} />;

export const Red = Template.bind({});
Red.args = {
  label: "Press me",
  backgroundColor: "red",
  // onClick: () => alert("Button clicked!"),
  size: "md",
};

export const Green = Template.bind({});
Green.args = {
  label: "Press me",
  backgroundColor: "Green",
  // onClick: () => alert("Button clicked!"),
  size: "md",
};

export const Small = Template.bind({});
Small.args = {
  label: "Press me",
  backgroundColor: "red",
  // onClick: () => alert("Button clicked!"),
  size: "sm",
};

export const Large = Template.bind({});
Large.args = {
  label: "Press me",
  backgroundColor: "green",
  // onClick: () => alert("Button clicked!"),
  size: "lg",
};