window.onload = function() {

	// Function used to determine if the boxes on the first line will be turned on or off
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (1 + max - min)) + min;
	}

	// Function used to add divs with our for loop
	Element.prototype.appendAfter = function (element) {
		element.parentNode.insertBefore(this, element.nextSibling);
	}, false;


	// The container
	var containerdiv = document.createElement('div');

	// The container's CSS
	containerdiv.style.margin = "auto";

	containerdiv.style.padding = "0 0 0 4px";
	containerdiv.style.width =  "1112px";

	//containerdiv.className='container';
	document.getElementsByTagName("body")[0].appendChild(containerdiv);

	// The first box
	var firstdiv = document.createElement('div');
	firstdiv.id='box-1-1';

	firstdiv.style.width =  "8px";
	firstdiv.style.height = "8px";
	firstdiv.style.border = "1px solid black";
	firstdiv.style.margin= "1px 0 0 1px";
	firstdiv.style.display = "inline-block";
	firstdiv.style.padding = "0";
	firstdiv.style.backgroundColor ="#fffff7";


	document.getElementsByTagName("div")[0].appendChild(firstdiv);
	if(getRandomInt(0,1) == 1){
		firstdiv.style.backgroundColor = "black";
		firstdiv.classList.add("black");
	}

	// The rest of the boxes on line (row) 1
	for (div_index = 2; div_index <= 101; div_index++) {
		var iDiv = document.createElement('div');


		iDiv.id = 'box-1-'+ div_index;
		iDiv.style.width =  "8px";
		iDiv.style.height = "8px";
		iDiv.style.display = "inline-block";

    

		iDiv.style.backgroundColor ="#fffff7";

		if(getRandomInt(0,1) == 1){
			iDiv.style.backgroundColor = "black";
		}

		var parent_div_id =  div_index-1;
		box1= document.getElementById('box-1-'+parent_div_id);
		/* Adds Element AFTER NeighborElement */

		iDiv.appendAfter(box1);
	}


	// Line (row) 2 to 50

	for(newline_index=2; newline_index<=50; newline_index++){
		for (div_index2 = 1; div_index2 <= 101; div_index2++) {
			if(div_index2 >1){
				var new_div= document.createElement('div');
				new_div.style.width ="8px";
				new_div.style.height ="8px";
				new_div.style.border = "1px solid black";
				new_div.style.margin = "1px 0 0 1px";
				new_div.style.display = "inline-block";
				new_div.style.padding = "0";
				new_div.style.backgroundColor = "#fffff7";
				new_div.id="box-"+newline_index+"-"+div_index2;
				var parent_div_id = div_index2 - 1;
				box1= document.getElementById('box-'+newline_index+"-"+parent_div_id);
				new_div.appendAfter(box1);
			}else{
				var new_div= document.createElement('div');
				new_div.style.width ="8px";
				new_div.style.height ="8px";
				new_div.style.border = "1px solid black";
				new_div.style.margin = "1px 0 0 1px";
				new_div.style.display = "inline-block";
				new_div.style.padding = "0";
				new_div.style.backgroundColor = "#fffff7";
				new_div.id="box-"+newline_index+"-"+div_index2;
				var parent_line_id = newline_index - 1;

				box1= document.getElementById('box-'+parent_line_id+"-101");
				new_div.appendAfter(box1);
			}


		}
	}// end of loop

	for(line_index=2; line_index<=50; line_index++){
		var top_line_index = line_index - 1;

		for (div_index3 = 1; div_index3 <= 101; div_index3++){
			if(div_index3 == 1){
				// First column

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
				// last column
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
