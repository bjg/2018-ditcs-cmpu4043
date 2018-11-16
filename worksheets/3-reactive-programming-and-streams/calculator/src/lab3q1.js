	import { Observable } from 'rxjs/Rx';
	import "./lab3q1.css";

    let calc = "";
	let op = '';
	let decimal = 0;
	let prevCalc = "";
	let resetDisplay = false;
		
	const buttons = document.getElementsByTagName("button");
	const screenValue = document.getElementById("calc-screen");
  
	const btn$ = Observable.fromEvent(buttons, 'click').pluck('target', 'value');
	const key$ = Observable.fromEvent(document, 'keydown').pluck('key');
	
	const keyStream$ = btn$.merge(key$);
	
    keyStream$.subscribe(k => 
	{
		// check if key is a number/decimal
		if (Number.isInteger(parseInt(k)) || k == '.')
		{
			if(resetDisplay)
			{
				screenValue.value = "";
				resetDisplay = false;
			}
			if (k == '.')
			{
				decimal++;
				if (decimal < 2)
				{
					screenValue.value += k;
				}
			}
			else
			{
				if (screenValue.value == '0')
				{
					screenValue.value = k;
				}
				else
				{
					screenValue.value += k;
				}
			}
		}
		// if clear key is pressed
		else if ( k == 'C' || k == 'c' )
		{
			screenValue.value = 0;
			decimal = 0;
			calc = "";
			op = '';
		}
		else if (k == "Enter" || k == '+' || k == '-' || k == '/' || k == 'x' || k == '*' || k == '=')
		{
			if (k == '?')
			{
				k = '/';
			}
			else if (k == 'x')
			{
				k = '*';
			}
			else if (k == 'Enter')
			{
				k = '=';
			}
		
			if (op == '')
			{
				calc += screenValue.value;
			}
			else if (op == '=')
			{
				if (k == '=')
				{
					calc = screenValue.value + prevCalc;
				}
			}
			else
			{
				calc += op + screenValue.value;
				prevCalc = op + screenValue.value;
			}
			
			// calculating input
			screenValue.value = eval(calc);
			op = k;
			resetDisplay = true;
			calc = screenValue.value;
		
		}
		
	});