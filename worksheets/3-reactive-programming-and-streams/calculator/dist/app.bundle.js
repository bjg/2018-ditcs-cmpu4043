/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//import Rx from 'rxjs/Rx'; //import library for rxjs.

// variable for the cal use later in the code.
let ans ;
let operation = '';  
let display = false;
// const declaration create a read-only reference to a value - get element form htnl which is flex-item.
const button = document.getElementsByClassName("flex-item"); 

// the Observable a static and the map operator 
const stream$ = Rx.Observable.from(button) 
  .map(btn => Rx.Observable.fromEvent(btn, 'click')
    .mapTo(btn.textContent))
  .mergeAll()
  .merge(Rx.Observable.fromEvent(document, 'keypress')
    .pluck('key'));

stream$.subscribe(key => {
  if (/\d/.test(key) || key === '.')
   {
    if (display)
    {
       document.getElementsByTagName('input')[0].value = key;
       display = false;

    } 
    else 
    {
       document.getElementsByTagName('input')[0].value += key;
    }
   // when the user press [C] will clear num 
  } else if (key === 'C') 

  {

    ans = 0;
    operation = '';

    document.getElementsByTagName('input')[0].value = '0';

  } else {

    const i = parseFloat(document.getElementsByTagName('input')[0].value);

 //The section will deal with [+] operation when the user click [+] will do the operation. 
    if (operation === '+')
    {
      ans += i;
    } 
    //The section will deal with [-] operation when the user click [-] will do the operation. 
    else if (operation === '-') 
    {
      ans -= i;
    }
    //The section will deal with [x] operation when the user click [x]  will do the operation.
     else if (operation === 'x' || operation === '*')
    {
      ans *= i;
    }
    //The section will deal with [/] operation when the user click [/]  will do the operation. 
     else if (operation === '÷' || operation === '/')
    {
      ans /= i;
    }
     else
    {
      ans = i;
    }

    document.getElementsByTagName('input')[0].value = ans;
    operation = key;
    display = true;
  }
});


/***/ })
/******/ ]);