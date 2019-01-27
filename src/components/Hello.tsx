import React, {
    Component,
} from 'react'
import { func } from '_@types_prop-types@15.5.5@@types/prop-types';
export interface HelloProps { compiler: string; framework: string }
export interface HelloState { name: string, age: number, like: Array<{ uid: number, address: string }>, selectedValue: string }
// 定义对象的(函数参数))
interface SquareConfig {
    color?: string;// 不去定字段
    width?: number;
}

// 函数 调用签名 当然还有别的形式
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = (source, subString) => {
    let result = source.search(subString);
    return result > -1;
}

// 只读
interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 10, y: 10 };

// 类
// 属性和方法

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");


class Animal {
    public name: string;
    private age: number;
    constructor(message: string) {
        console.log(message);
        this.name = message;
        this.age = 19;
    }
    say() {
        return 'hell' + this.name;
    }
}
let cat = new Animal('oo');

class Dog extends Animal {
    constructor(name: string) { super(name); }
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog('9');


class Hello extends Component<HelloProps, HelloState> {
    constructor(props: HelloProps) {
        super(props);
        this.state = {
            age: 123,
            name: 'isam2016',
            like: [],
            selectedValue: '',
        }
    }
    /**
     *  函数最终返回的值
     *  { name: string, age: number } 
     */
    addLike = (config: SquareConfig): { name: string, age: number } => {
        let newAquence = { name: 'isam2018', age: 100 };
        if (config.color) {
            newAquence.name = 'isam2016';
        }
        if (config.width) {
            newAquence.age = 99;
        }
        return newAquence;
    }
    chnageNmae = (event: React.FormEvent<HTMLSelectElement>): void => {
        var safeSearchTypeValue: string = event.currentTarget.value;
        console.log(safeSearchTypeValue); // in chrome => B
        this.setState((proState, props) => {
            return {
                selectedValue: safeSearchTypeValue
            }
        })
    }
    object = ({ a, b }: { a: string, b: number }): void => {
        console.log(a);
    }
    render() {
        return (
            <div>
                hellow  form {this.props.compiler} and {this.props.framework}
                myname is {this.state.age}, name is {this.state.name}
                <div><button onClick={() => { this.addLike }}>add like</button></div>
                <select className="form-control" id="searchType" onChange={e => this.chnageNmae(e)} value={this.state.selectedValue}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
                <h1>{this.state.selectedValue}</h1>
                <button onClick={() => this.object({ a: '12', b: 0 })}>对象及解构</button>
            </div>
        );
    }
}

export default Hello;