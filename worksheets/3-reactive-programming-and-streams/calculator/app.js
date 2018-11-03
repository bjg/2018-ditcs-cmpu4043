import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/style.css'; // importing css
import keenImage from '../assets/keen.png';

export default class Hello extends Component {
  render() {
    return (
      <div>
        Hello from react

				<img src= { keenImage } alt='Commander Keen'></img>
      </div>
    );
  }
}

render(<Hello />, document.getElementById('app'));