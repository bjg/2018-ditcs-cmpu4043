import Rx from 'rxjs/Rx'; //import library for rxjs.

// variable for the cal use later in the code in the down.
let ans = 0;
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
	// get input from html placeholder as in id [input]
       document.getElementById('input').value = key;
       display = false;

    } 
    else 
    {
	// get input from html placeholder as in id [input]
       document.getElementById('input').value += key;
    }
   // when the user press [C] will clear num 
  } else if (key === 'C') 

  {

    ans = 0;
    operation = '';

   // get input from html placeholder as in id [input]
    document.getElementById('input').value = '0';

  } else {

    // get input from html placeholder as in id [input]
    const i = parseFloat(document.getElementById('input').value);

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
     else if (operation === 'x' || operation === 'x')
    {
      ans *= i;
    }
    //The section will deal with [/] operation when the user click [/]  will do the operation. 
     else if (operation === '/' || operation === '/')
    {
      ans /= i;
    }
     else
    {
      ans = i;
    }
    // get input from html placeholder as in id [input]
    document.getElementById('input').value = ans;
    operation = key;
    display = true;
  }
});
