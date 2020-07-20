import {ToyReact, Component} from './ToyReact';

class MyComponent extends Component {
  
  
  
  render() {
    return (
      <div>
        <span>Try</span>&nbsp;&nbsp;
        <span>To</span>&nbsp;&nbsp;
        <span>Write</span>&nbsp;&nbsp;
        <span>JSX</span>
        <div>{this.children}</div>
      </div>
    )
  }
}
// let a = <div>
//   <span>123</span>
// </div>
// document.body.appendChild(a);
let a = <MyComponent name="a" id="aa">
  <div>123</div>
</MyComponent>

ToyReact.render(a, document.body);