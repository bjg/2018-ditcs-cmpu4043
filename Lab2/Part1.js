
function cal(number) {
	 
						
	let str = document.getElementById("screen").innerHTML ;
	let i;
	let empty;
	let result; 
		
		
	
	if(number == 'c'){
				
    	document.getElementById("screen").innerHTML = '';

	// this part deal with '='
	}else if(number == '=' ){
					 
	// this part deal with '-'
	if(str.indexOf("-") != -1){
								
		i = str.split("-") ;
		result = i[0] - i[1];
								
	 // this part deal with '+'  
	}else if(str.indexOf("+") != -1){
								
		i = str.split("+");
		result = parseInt(i[0]) + parseInt(i[1]);
								
	 // this part deal with 'x'
	}else if(str.indexOf("x") != -1){
								
		i = str.split("x");
		result = i[0] * i[1];
								
	 // this part deal with '/'
	}else if(str.indexOf("/") != -1){
								
		i = str.split("/");
		result = i[0] / i[1];
								
	}else{
		result = number ;
		}
	 // this part deal with '±'
	if(str.indexOf("±") != -1){
								
		i = str.split("±") ;
		result = i[0] - i[1];
						
	 // this part deal with '('  
	}else if(str.indexOf("(") != -1){
								
		i = str.split("(");
		result = parseInt(i[5]) + parseInt(i[1]);
							
	// this part deal with ')'
	}else if(str.indexOf(")") != -1){
								
		i = str.split(")");
		result = i[4] + i[1];
								
		}
	//results printed
	document.getElementById("screen").innerHTML = result ;
							
	}else{
			 
	document.getElementById("screen").innerHTML =  document.getElementById("screen").innerHTML + number;
		}
				
	}