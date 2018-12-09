/* Javascript file for the bracket and negate operations */

funct=0;

function openpara(v) {
	calculator.display.value += v;
	funct+=1;
}

function closepara(e) {
	calulator.display.value += e;
	funct-=1;
}

function plusmin() {
  if ($('#input').val() === '') return;
  equal = eval($('#input').val() + '*-1');
  fNumber(equal);
}