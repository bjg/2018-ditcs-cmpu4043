//part three	
	
	let black = "black";
	let random = (Math.random() * 2 ) + 1 ;
	let rowOne = [];
	let rowTwo = [] ;
	let temp = [] ;

	for(let i = 0 ; i < 101 ; i ++){
		
		let random = (Math.random() * 2 ) + 1 ;
		let div = document.createElement("div");
		
		if(random < 2){
			
			black = "black";
			rowOne[i] = "active" ;
			
		}else{
			black = "#C0C0C0";
			rowOne[i] = "inactive" ;
		}
			div.style.width = "8px";
			div.style.height = "8px";
			div.style.backgroundColor = black ;
			div.style.border = "1px solid black";
			div.style.float = "left"; 
			document.body.appendChild(div);
	}

	for(let y = 0 ; y < 50 ; y++){
		
		let outerdiv = document.createElement("div");
		
		outerdiv.style.clear = "left";
		
		document.body.appendChild(outerdiv);
		
		for(let j = 0 ; j < 101 ; j ++){
			
			let left ;
			let right ;
			let above ;
		
			let innerdiv = document.createElement("div");
			
			if(j == 0 ){
				
				left = rowOne[rowOne.length - 1];
				above  = rowOne[0]
				right = rowOne[1];
				
				
			}else if(j == (rowOne.length - 1)){
				
				left = rowOne[rowOne.length - 2] ;
				above = rowOne[rowOne.length - 1];
				right = rowOne[0];
			}else{
				
				left = rowOne[j-1];
				above = rowOne[j];
				right = rowOne[j+1]
			}
			
			if((right == "active" && above == "active" && right == "active") || 
			   (right == "inactive" && above == "inactive" && left == "inactive")){
			
				black = "black";
				rowTwo[j] = "active" ;
			
			}else{
				black = "#C0C0C0";
				rowTwo[j] = "inactive" ;
			}

				innerdiv.style.width = "8px";
				innerdiv.style.height = "8px";
				innerdiv.style.backgroundColor = black ;
				innerdiv.style.border = "1px solid black";
				innerdiv.style.float = "left";
				outerdiv.appendChild(innerdiv);
		}
		
		rowOne = rowTwo.slice(0);
	}