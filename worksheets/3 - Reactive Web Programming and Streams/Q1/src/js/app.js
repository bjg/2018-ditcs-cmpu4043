
import { Observable, Subject, ReplaySubject, from, fromEvent, of, range,  } from 'rxjs';
import { map, filter, switchMap } from 'rxjs/operators';

import '../css/style.css'; // Import CSS -> ADDED IN THIS STEP

// Global variable to check which key was pressed last
let state=0;
let last_value;
let value_screen= "0";


function clrscr(){
    state=0;
    last_value= undefined;
    value_screen= "0";
    document.getElementById("text-on-screen").innerHTML = value_screen;
}
function total(){
    if(last_value !=undefined){
      if(last_value !='0'){
        value_screen+=last_value;
        document.getElementById("text-on-screen").innerHTML = eval(value_screen);
        last_value= eval(value_screen);
        value_screen="";
      }else{
        
        document.getElementById("text-on-screen").innerHTML = eval(value_screen);

        last_value= eval(value_screen);
        value_screen="";
      }
    }
}

function change_value(value){
    // if(value_screen.length >18){
    //     alert("No space on the screen");
    //     return(0);
    // }
    if(value == '') return;
    if( value == '-' || value == '+' || value == '/' || value == '*' ){
        
        if(value_screen.charAt(value_screen.length-1) == '-' || value_screen.charAt(value_screen.length-1) == '+' || value_screen.charAt(value_screen.length-1) == '/' || value_screen.charAt(value_screen.length-1) == '*'){
            if(last_value == 0 || last_value== undefined){
                //alert("FOUND");
            }else{
                if(value_screen == "0" || value_screen == ""){
                if(last_value != undefined){
                    value_screen = last_value +" "+ value ;
                    last_value = 0;
                    document.getElementById("text-on-screen").innerHTML = value_screen;    
                }
                }else{
                    value_screen+= " "+ last_value;
                    value_screen += " "+ value;
                    last_value = 0;
                    document.getElementById("text-on-screen").innerHTML = value_screen;
                }    
            }
            
        }else{
            if(value_screen == "0" || value_screen == ""){
                if(last_value != undefined){
                    value_screen = last_value +" "+ value ;
                    last_value = 0;
                    document.getElementById("text-on-screen").innerHTML = value_screen;    
                }
            }else{
                value_screen+= " "+ last_value;
                value_screen += " "+ value;
                last_value = 0;
                document.getElementById("text-on-screen").innerHTML = value_screen;
            }
        }
    }else if( value == '(' || value == ')'){
      if(last_value != undefined && value_screen !=""){
        if(last_value == 0){
          value_screen+=' '+ value;
          document.getElementById("text-on-screen").innerHTML = value_screen;
        }else{
          value_screen+=' '+last_value +' '+ value;
          last_value=0;
          document.getElementById("text-on-screen").innerHTML = value_screen;
        }
        
        
      }
    }else if(value=='.'){
      if(last_value == undefined && value_screen =="0"){
            value_screen += "."; 
            document.getElementById("text-on-screen").innerHTML = value_screen;

        }else if(last_value == 0){
            value_screen += "."; 
            document.getElementById("text-on-screen").innerHTML = value_screen;
      }

    }else if(value == '-1'){
      if(value_screen == null || value_screen == ''){
          value_screen = parseInt(last_value) * (-1);
          last_value = 0;
          document.getElementById("text-on-screen").innerHTML = value_screen;
      }else{ 
          value_screen+= " +"+ last_value;
          value_screen = eval(value_screen);
          value_screen = value_screen * (-1);
          document.getElementById("text-on-screen").innerHTML = value_screen;
      }
        
    }else{ // it's a number
          //alert(last_value);
      if(last_value == undefined) {
        last_value = parseInt(value);
        
      }else{
          last_value = last_value*10 + parseInt(value);
          //alert(last_value);
      }

      
      if(value_screen == "0" || value_screen == ""){
          document.getElementById("text-on-screen").innerHTML= last_value;
          value_screen = "";
      }else{
          document.getElementById("text-on-screen").innerHTML= value_screen + " " +last_value;
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
        if(value == 'c'){
          clrscr();
        }else if(value == '='){
          total();
        }else if(value == '±'){
          change_value('-1');
        }else if(value == '÷'){
          change_value('/');
        }else if(value == 'X' || value == 'x' ){
          change_value('*');
        }else if(value == '('){
          change_value('(');
        }else if(value == ')'){
          change_value(')');
        }else if(value == '.'){
          change_value('.');
        }else{
            change_value(value);
        }      
      } 
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
  );

  let allowed_keys="1234567890()/+-x*X.";
  let target = document.querySelector('body');
  const keyclick$= fromEvent(target, 'keydown');
  keyclick$.subscribe(
    ev=>{
        if(ev.key == 'c'){
            clrscr();
        }else if(ev.key == 'x'){
            change_value('*');
        }else if(ev.key == '='){
            total();
        }else if(allowed_keys.indexOf(ev.key) != -1) {change_value(ev.key);}
        
      
    },
    error=>{window.alert("Error");},
    ()=>{window.alert("Complete");}
  );


} 