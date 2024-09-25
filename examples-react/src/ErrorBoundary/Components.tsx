import { Component } from "react";

interface MyComponentState {
  throwError: boolean;
}

class MyComponent extends Component<object, MyComponentState> {
  constructor(props: object) {
    super(props);
    this.state = { throwError: false };
  }

  handleClick = () => {
    this.setState({ throwError: true });
  };

  render() {
    if (this.state.throwError) {
      throw new Error("An error has occurred!");
    }

    return (
      <div>
        <button onClick={this.handleClick}>Cause Error</button>
      </div>
    );
  }
}

export default MyComponent;
