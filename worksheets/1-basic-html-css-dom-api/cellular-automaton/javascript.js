var line1 = [];
var line2 = [];//TWO ARRAYS TO HOLD THE ROWSABOVE AND BELOW EACHOTHER
for(var i = 0;i<=100;i++)
  {
    //FOR LOOP TO CREATE TOP LINE RANDOM
  //STYLE THE BOXES
    let div = document.createElement("DIV");
    div.style.border = "1px solid black";
    div.style.width = "8px";
    div.style.height = "8px";
    div.style.float = "left";
    var num = Math.floor( Math.random()*2);//RANDOM COLOUR BETWEEN 1 AND 2
	line1[i]=num;
    if(num == 1)
      {
        //IF ITS 1 IT IS PURPLE
        div.style.background = "purple";
        
        
      }
    if(num ==0)
      {
        //IF ITS 0 IT IS PINK
        div.style.background = "pink";
      
      }
           
    document.body.appendChild(div);//DISPLAY DIV
 
  }
 
   for(var i = 0;i<=49;i++)
  {
    //FOR LOOP TO CREATE 50 ROWS
    //CREATE A LINE BREAK
      var linebreak = document.createElement("div");
      linebreak.style.clear = "both";
      document.body.appendChild(linebreak);
    
          for(var j = 0;j<=100;j++)
        {
          //FOR LOOP TO CREATE 101 ELEMENTS IN 50 ROWS
          
           var div = document.createElement("DIV");
          div.style.border = "1px solid black";
          div.style.width = "8px";
          div.style.height = "8px";
          div.style.float = "left";
 
          
              var num1;
              num1 = whatcolour(j,line1, line2);//CALL FUNCTION 
          //FUNCTION RETURNS 1 OR 2
          //IF IT IS 1 IT WILL BE PURPLE(black) 
		  //IF IT IS 0 IT WILL BE PINK (white)
               if (num1 == 1)
              {
                div.style.background = "purple";
                line2[j]=1;
              }
              else
              {
                div.style.background = "pink";
                line2[j]=0;
              }
            
            document.body.appendChild(div);
       
    
         }
          line1= line2;//MAKE LINE 1 NOW = TO LINE 2 SO IT IS NOW THE 1ST LINE
          line2 = [];//EMPTY SECOND LINE
  }


function whatcolour(pos, array,array_2)
{
  var left_box, right_box, middle_box, box_colour;
  //if its the last element 
  if (pos ==100)
    {
      right_box = array_2[0]; //FIRST ELEMENT OF THE SECOND ARRAY
      left_box = array[pos-1];//LEFT TOP BOX
      middle_box = array[pos];//DIRECTLY ABOVE BOX
    }
  //IF ITS THE FIRST ELEMENT
  else if(pos==0)
    {
      right_box = array[pos+1];//RIGHT TOP BOX
      left_box = array[100];//LAST BOX OF ROW ABOVE
      middle_box = array[pos];//BOX DIRECTLY ABOVE
    }
  else
    {
      right_box = array[pos+1];//RIGHT TOP BOX
      left_box = array[pos-1];//LEFT TOP BOX
      middle_box = array[pos];//BOX DIRECTLY ABOVE
    }
  
  //1 IS PURPLE AND 0 IS PINK
  if(left_box == 1   &&  middle_box ==1 && right_box == 1)
   {
          //b,b,b =w
          box_colour = 0;
          
   }
    else if( left_box == 1 && middle_box ==1 && right_box == 0 )
   {
   
          box_colour = 0;
   }
  else if( left_box == 1 && middle_box ==0 && right_box == 1)
   {
          box_colour = 1;
   }
  else if( left_box == 1 && middle_box ==0 && right_box == 0 )
   {
          box_colour = 1;
   }
      else if( left_box == 0 && middle_box ==1 && right_box == 1 )
   {
          box_colour = 1;
   }
  else if( left_box == 0 && middle_box ==1 &&right_box == 0 )
   {
          box_colour = 1;
   }
     else if( left_box == 0 && middle_box ==0 &&right_box == 1 )
   {
          box_colour = 0;
   }
  
    else if( left_box == 0 && middle_box ==0 &&right_box == 0 )
   {
          box_colour = 0;
   }
  

  return(box_colour);//return 1 or 0

}

