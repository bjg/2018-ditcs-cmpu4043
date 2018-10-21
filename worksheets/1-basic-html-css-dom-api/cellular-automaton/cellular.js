<script>
	window.onload = function() {

		// randomizer function to turn the first box on or off
		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		// function used to add divs with our for loop
		Element.prototype.appendAfter = function (element) {
			element.parentNode.insertBefore(this, element.nextSibling);
		}, false;

		// container variable and css
		var containerdiv = document.createElement('div');
		containerdiv.style.margin = "auto";
		containerdiv.style.border = "3px solid yellow";
		containerdiv.style.padding = "3 3 3 3px";
		containerdiv.style.width =  "1112px";
		
		document.getElementsByTagName("body")[0].appendChild(containerdiv);

		// first cell
		var firstBox = document.createElement('div');
		firstBox.id='box-1-1';
		firstBox.style.width =  "8px";
		firstBox.style.height = "8px";
		firstBox.style.border = "1px solid red";
		firstBox.style.margin= "1px 0 0 1px";
		firstBox.style.display = "inline-block";
		firstBox.style.padding = "0";
		firstBox.style.backgroundColor ="#fffff7";
		
		document.getElementsByTagName("div")[0].appendChild(firstBox);
		if(getRandomInt(0,1) == 1){
			firstBox.style.backgroundColor = "blue";
			firstBox.classList.add("blue");
		}

		// The rest of the boxes on line (row) 1
		for (div_index = 2; div_index <= 101; div_index++) {
			var firstLine = document.createElement('div');
			
			firstLine.id = 'box-1-'+ div_index;
			firstLine.style.width =  "8px";
			firstLine.style.height = "8px";
			firstLine.style.border = "1px solid black";
			firstLine.style.margin= "1px 0 0 1px";
			firstLine.style.display = "inline-block";
			firstLine.style.padding = "0";
			firstLine.style.backgroundColor ="#fffff7";
		
			if(getRandomInt(0,1) == 1){
				firstLine.style.backgroundColor = "black";
			}
			
			var parent_div_id =  div_index-1;
			boxOne= document.getElementById('box-1-'+parent_div_id);
			/* Adds Element AFTER NeighborElement */
			
			firstLine.appendAfter(boxOne);
		}
		// Line (row) 2 to 50
		for(newline_index=2; newline_index<=50; newline_index++){
			for (div_index2 = 1; div_index2 <= 101; div_index2++) {
				if(div_index2 >1){
					var divChild= document.createElement('div');
					divChild.style.width ="8px";
					divChild.style.height ="8px";
					divChild.style.border = "1px solid black";
					divChild.style.margin = "1px 0 0 1px";
					divChild.style.display = "inline-block";
					divChild.style.padding = "0";
					divChild.style.backgroundColor = "#fffff7";
					divChild.id="box-"+newline_index+"-"+div_index2;
					var parent_div_id = div_index2 - 1;
					firstBox= document.getElementById('box-'+newline_index+"-"+parent_div_id);
					divChild.appendAfter(boxOne);
				}else{
					var divChild= document.createElement('div');
					divChild.style.width ="8px";
					divChild.style.height ="8px";
					divChild.style.border = "1px solid black";
					divChild.style.margin = "1px 0 0 1px";
					divChild.style.display = "inline-block";
					divChild.style.padding = "0";
					divChild.style.backgroundColor = "#fffff7";
					divChild.id="box-"+newline_index+"-"+div_index2;
					var parent_line_id = newline_index - 1;
					
					boxOne= document.getElementById('box-'+parent_line_id+"-101");
					divChild.appendAfter(boxOne);
				}    
			}
		}
		for(line_index=2; line_index<=50; line_index++){
			var top_line_index = line_index - 1;

			for (div_index3 = 1; div_index3 <= 101; div_index3++){
				if(div_index3 == 1){ 

					var topleft_col_index = 101;
					var topleft= document.getElementById('box-'+top_line_index+'-'+topleft_col_index);
					var top = document.getElementById('box-'+top_line_index+'-'+div_index3);
					var topright_col_index = div_index3 + 1;
					var topright=document.getElementById('box-'+top_line_index+'-'+topright_col_index);  
					
					if( 
						topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)" && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)"&& topright.style.backgroundColor =="rgb(255, 255, 247)" 
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor =="rgb(255, 255, 247)"
					)
					{
						document.getElementById("box-"+line_index+"-"+div_index3).style.background = "black";
					}

				}else if(div_index3 == 101){
					var topleft_col_index = div_index3 - 1;
					var topleft = document.getElementById('box-'+top_line_index+'-'+topleft_col_index);

					var top = document.getElementById('box-'+top_line_index+'-'+div_index3);
					var topright_col_index = 1;
					var topright=document.getElementById('box-'+top_line_index+'-'+topright_col_index);
					
					
					if( 
						topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)" && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)"&& topright.style.backgroundColor =="rgb(255, 255, 247)" 
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor =="rgb(255, 255, 247)"
					)
					{
						document.getElementById("box-"+line_index+"-"+div_index3).style.background = "black";
					}
				}else
				{
					var topleft_col_index = div_index3 - 1;
					var topleft = document.getElementById('box-'+top_line_index+'-'+topleft_col_index);
					
					var top = document.getElementById('box-'+top_line_index+'-'+div_index3);

					var topright_col_index = div_index3 + 1;
					var topright=document.getElementById('box-'+top_line_index+'-'+topright_col_index);
					
					// Using a single if statement to decide if the box should be turned on (black)
					if(
						topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)" && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "black" && top.style.backgroundColor == "rgb(255, 255, 247)"&& topright.style.backgroundColor =="rgb(255, 255, 247)" 
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor == "black"
						|| topleft.style.backgroundColor == "rgb(255, 255, 247)" && top.style.backgroundColor =="black"  && topright.style.backgroundColor =="rgb(255, 255, 247)"
						){
						document.getElementById("box-"+line_index+"-"+div_index3).style.background = "black";
					}
				}
			}
		}
		if(document.getElementById('box-1-1').classList.contains('black')){	
		}
	};
</script>