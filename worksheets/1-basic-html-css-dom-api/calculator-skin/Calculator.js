<!DOCTYPE html>
<!-- 
Kevin Furlong, 
C14710491
Calculator Html

Found the math symbols from the following link, 
https://www.toptal.com/designers/htmlarrows/symbols/ 
-->


<html>
<header>
	<link rel="stylesheet" type="text/css" href="calculator.css">		 
</header> 

<body>
<center>
	<form name="Calculator">
	<input name="display" placeholder = "0" />
	<br>
	<!-- "button"s -->
	
	<input type ="button" value="(" onClick="btnLeftPar()"/>
	<input type ="button" value=")" onClick="btnRightPar()"/>
	<input type ="button" value="&#177;" onClick="btnInvert()"/>
	<input type ="button" value="&#247;" onClick="btnDiv()"/>
	<br>
	
	<input type ="button" value="7" onClick="document.Calculator.display.value+='7'"/>
	<input type ="button" value="8" onClick="document.Calculator.display.value+='8'"/>
	<input type ="button" value="9" onClick="document.Calculator.display.value+='9'"/>
	<input type ="button" value="&#215;" onClick="btnMult()"/>
	<br>
		
	<input type ="button" value="4" onClick="document.Calculator.display.value+='4'"/>
	<input type ="button" value="5"onClick="document.Calculator.display.value+='5'"/>
	<input type ="button" value="6"onClick="document.Calculator.display.value+='6'"/>
	<input type ="button" value="&#8722;" onClick="btnSub()"/>
	<br>
	
	<input type ="button" value="1" onClick="document.Calculator.display.value+='1'"/>
	<input type ="button" value="2" onClick="document.Calculator.display.value+='2'"/>
	<input type ="button" value="3" onClick="document.Calculator.display.value+='3'"/>
	<input type ="button" value="&#43;" onclick="btnAdd()"/>
	<br>
		
	<input type ="button" value="0" onClick="document.Calculator.display.value+='0'"/>
	<input type ="button" value="C" onclick="btnClear()"/>
	<input type ="button" value="&#46;" onclick="btnPoint()"/>
	<input type ="button" value="&#61;" onclick="document.Calculator.display.value = eval(document.Calculator.display.value)"/>
	</form>
	<script>
		function btnAdd() {
			document.Calculator.display.value+='+';
			document.Calculator.display.style.text-align="Right";
		}
		function btnSub() {
			document.Calculator.display.value+='-';
			document.Calculator.display.style.text-align="Right";
		}
		function btnMult() {
			document.Calculator.display.value+='*';
			document.Calculator.display.style.text-align="Right";
		}
		function btnDiv() {
			document.Calculator.display.value+='/';
			document.Calculator.display.style.text-align="Right";
		}
		function btnInvert() {
			document.Calculator.display.value+='&#177;';
			document.Calculator.display.style.text-align="Right";
		}
		function btnRightPar() {
			document.Calculator.display.value+=')';
			document.Calculator.display.style.text-align="Right";
		}
		function btnLeftPar() {
			document.Calculator.display.value+='(';
			document.Calculator.display.style.text-align="Right";
		}
		function btnPoint() {
			document.Calculator.display.value+='.';
			document.Calculator.display.style.text-align="Right";
		}
		
	
	</script>
	</center>
</body> 

</html>


