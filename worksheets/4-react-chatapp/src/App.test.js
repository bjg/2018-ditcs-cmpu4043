/***
 * Name: App.test.js
 *
 * Description: - Unit Test and Automation section. (Not used)
 **/

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});