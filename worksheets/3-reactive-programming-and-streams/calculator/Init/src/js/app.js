import React, { Component } from 'react';
import { render } from 'react-dom';
import Rx from 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import '../css/style.css'; // importing css

// RxJS v6+
import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

// Create observable
// const buttonsStream$ =  fromEvent(buttons, 'click')
// const keyboardInput$ =  fromEvent(document, 'keypress')

// Test
const result = document.getElementById("calculator");
const buttonSix = document.getElementById("six");

const test$ = fromEvent(buttonSix, 'click');
test$.subscribe(ev => {
  result.screen.value = '8';
})
