import React, { Component } from "react";
export interface HelloProps {
  compiler: string;
  framework: string;
}
export interface HelloState {
  name: string;
  age: number;
  like: Array<{ uid: number; address: string }>;
  selectedValue: string;
}
// 定义对象的(函数参数))
interface SquareConfig {
  color?: string; // 不去定字段
  width?: number;
}

class Hello extends Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props);
    this.state = {
      age: 123,
      name: "isam2016",
      like: [],
      selectedValue: ""
    };
  }
  /**
   *  函数最终返回的值
   *  { name: string, age: number }
   */
  addLike = (config: SquareConfig): { name: string; age: number } => {
    let newAquence = { name: "isam2018", age: 100 };
    if (config.color) {
      newAquence.name = "isam2016";
    }
    if (config.width) {
      newAquence.age = 99;
    }
    return newAquence;
  };
  chnageNmae = (event: React.FormEvent<HTMLSelectElement>): void => {
    var safeSearchTypeValue: string = event.currentTarget.value;
    console.log(safeSearchTypeValue); // in chrome => B
    this.setState((proState, props) => {
      return {
        selectedValue: safeSearchTypeValue
      };
    });
  };
  object = ({ a, b }: { a: string; b: number }): void => {
    console.log(a);
  };
  render() {
    return (
      <div>
        hellow form {this.props.compiler} and {this.props.framework}
        myname is {this.state.age}, name is {this.state.name}
        <div>
          <button
            onClick={() => {
              this.addLike;
            }}
          >
            add like
          </button>
        </div>
        <select
          className="form-control"
          id="searchType"
          onChange={e => this.chnageNmae(e)}
          value={this.state.selectedValue}
        >
          <option value="A">A</option>
          <option value="B">B</option>
        </select>
        <h1>{this.state.selectedValue}</h1>
        <button onClick={() => this.object({ a: "12", b: 0 })}>
          对象及解构
        </button>
      </div>
    );
  }
}

export default Hello;
