
/*
const start = fromEvent(document.getElementById('start'), 'click').subscribe(function (e)
{
	  started = true;
});

const stop = fromEvent(document.getElementById('stop'), 'click').subscribe(function (e) {
	  started = false;
	});

const split = fromEvent(document.getElementById('split'), 'click').subscribe(function (e) {
	  if(split_count < 5)
	  {
		  split_count += 1;

		  // create new div elements to append the split data to the document
		  let split_title = document.createElement("div");
		  let split_div = document.createElement("div");
		  let newline = document.createElement("br");

		  // set the class value for the divs, to ensure CSS styling is applied
		  split_title.classList.add('split_title');
		  split_div.classList.add('split');
		  newline.classList.add('breaks');

		  // add the split details to the innerHTML of the divs
		  split_title.innerHTML = "Split " + split_count + " => ";
		  split_div.innerHTML = mins.innerHTML + " : " + secs.innerHTML + " : " + millis.innerHTML;

		  // append the new divs to the document
		  splits.appendChild(split_title);
		  splits.appendChild(split_div);
		  splits.appendChild(newline);
	  }
	});

const reset = fromEvent(document.getElementById('reset'), 'click').subscribe(function (e) {
	  started = false;
	  time = 0;
	  split_count = 0;
	  draw(time);
	  mins.innerHTML = "0";
	  secs.innerHTML = "0";
	  millis.innerHTML = "00";
	  resetSplits();
	});
*/
