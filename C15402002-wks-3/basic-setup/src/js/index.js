import { fromEvent, merge } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import "../css/style.css";

const btn= document.getElementsByClassName("btn");

let textinput = '';
const keys = fromEvent(document, 'keypress').pipe(map(event => event.key))
    .pipe(filter(key => "1234567890-+*/().".indexOf(key) !== -1 || key === 'c' || key === 'C' || key === '='));


const mouse = fromEvent(document, 'click').pipe(map(event =>event.target.innerHTML));

//const v = "1234567890-+*/().";

const input = document.getElementsByTagName('input')[0];


const stream$ = merge(keys, mouse);

stream$.subscribe(key => {

    //console.log("clicked")
    //


    if (key === 'C' || key === 'c') {
      clear();
    }

   else if (key === '=' ) {
       console.log(textinput);
        console.log(key);

        try{
            equal();
        }
        catch{
            input.value="error input";
        }
    }else{
        textinput += key;
        input.value = textinput;
    }
      //  equal();


});

function clear(){
    textinput = ' ';
    input.value = '0';

}

function equal(){
    let answer = eval(textinput);
    input.value ='';
    input.value =answer;
    console.log(eval(textinput));
}


