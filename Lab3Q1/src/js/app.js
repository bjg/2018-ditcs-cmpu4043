import {Observable, interval, fromEvent} from 'rxjs';
import '../css/style.css';

let last_input;
let result= "0";

function total(){
	if(last_input != '0'){
	result += last_input;
	console.log(result);
	console.log(eval(result));
	document.getElementById("screen_text").innerHTML = eval(result);

	last_input= eval(result);
	result = "";
	console.log(last_input);
	console.log(result);
	}else{
	console.log(result);
	console.log(eval(result));
	document.getElementById("screen_text").innerHTML = eval(result);

	last_input = eval(result);
	result = "";
	console.log(last_input);
	console.log(result);
    }
}

function clear(){
	last_input = undefined;
    result = "0";
    document.getElementById("screen_text").innerHTML = result;
}

function change_value(value){
    if(value == '') return;
    if( value == '-' || value == '+' || value == '/' || value == '*' ){
        
        if(result.charAt(result.length-1) == '-' || result.charAt(result.length-1) == '+' || result.charAt(result.length-1) == '/' || result.charAt(result.length-1) == '*'){
            if(last_input == 0 || last_input== undefined){
            }else{
                if(result == "0" || result == ""){
                if(last_input != undefined){
                    result = last_input +" "+ value ;
                    last_input = 0;
                    document.getElementById("screen_text").innerHTML = result;    
					}
                }
				else{
                    result+= " "+ last_input;
                    result += " "+ value;
                    last_input = 0;
                    document.getElementById("screen_text").innerHTML = result;
                }    
            }
        }else{
            if(result == "0" || result == ""){
                if(last_input != undefined){
                    result = last_input +" "+ value ;
                    last_input = 0;
                    document.getElementById("screen_text").innerHTML = result;    
                }
            }else{
                result += " " + last_input;
                result += " " + value;
                last_input = 0;
                document.getElementById("screen_text").innerHTML = result;
            }
        }
    }else if( value == '(' || value == ')'){
		if(last_input != undefined && result !=""){
			if(last_input == 0){
				result += ' ' + value;
				document.getElementById("screen_text").innerHTML = result;
			}
			else{
				result += ' ' + last_input +' '+ value;
				last_input = 0;
				document.getElementById("screen_text").innerHTML = result;
			}
		}
    }else if(value=='.'){
		if(last_input == undefined && result =="0"){
			}else if(last_input == 0){
		}
    }else if(value == '-1'){
		if(result == null || result == ''){
			result = parseInt(last_input) * (-1);
			last_input = 0;
			document.getElementById("screen_text").innerHTML = result;
		}else{ 
			result += " + " + last_input;
			result = eval(result);
			result = result * (-1);
			document.getElementById("screen_text").innerHTML = result;
		}
    }else{ 
		if(last_input == undefined) {
			last_input = parseInt(value); 
		}else{
			last_input = last_input*10 + parseInt(value);
		}
		
		if(result == "0" || result == ""){
			document.getElementById("screen_text").innerHTML= last_input;
			result = "";
		}else{
			document.getElementById("screen_text").innerHTML= result + " " + last_input;
		}
    }
}

window.onload = function(){
	var buttons = document.getElementsByClassName("button");

	const clicks$ = fromEvent(buttons, 'click');
	clicks$.subscribe(
    ev=>{
      let value = ev.path[0].innerHTML;
      if(value.length <=2){
        console.log(value);
		switch(value){
			case 'c':
			clear();
			break;
			
			case '=':
			total();
			break;
			
			case '±':
			change_value('-1');
			break;
			
			case '÷':
			change_value('/');
			break;
			
			case 'X':
			change_value('*');
			break;
			
			case 'x':
			change_value('*');
			break;
			
			case '(':
			change_value('(');
			break;
			
			case ')':
			change_value(')');
			break;

			case '.':
			change_value('.');
			break;

			default:
			change_value(value);
			break
		}
      } 
    },
  );

	let keys = "()/+-xX*.1234567890";
	let target = document.querySelector('body');
  
	const keyclick$ = fromEvent(target, 'keydown');
	keyclick$.subscribe(
    ev=>{
        if(ev.key == 'c'){
            clear();
        }else if(ev.key == '='){
            total();
        }else if(keys.indexOf(ev.key) != -1) {change_value(ev.key);}
    },
  );
}