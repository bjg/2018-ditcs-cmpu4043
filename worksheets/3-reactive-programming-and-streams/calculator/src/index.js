import "./style.css";
import {Calculator} from "./components/calculator/init"
import {Observable} from 'rxjs/Rx';

const calculator = Calculator();
console.log(calculator);
document.getElementsByTagName("BODY")[0].appendChild(calculator);
