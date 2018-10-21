class Calculator {
    
    constructor() {
        this.prevInput = ' ';
        this.currInput = '0';
        this.validInput = ['0','1','2','3','4','5','6','7','8','9', '+', '-', '*', '/', '.', 'c', '=', '(', ')'];
    }
    
    buttonClick(value) {
        this.currInput = value;
        this.prevInput += this.currInput;
        this.display();
    }
    
    onKeyUp(event) {
        
        let key = event.key.toString();
        
        if(this.validInput.includes(key)) {
            
            if(key == 'c') {
                this.clear();
            } else if (key == '=') {
                this.evaluate();
            } else {
                this.buttonClick(key);
            }
            
        }
        
    }
    
    clear() {
        this.prevInput = ' ';
        this.currInput = '0';
        this.display();
    }
    
    evaluate() {
        this.answer = eval(this.prevInput);
        this.clear();
        this.buttonClick(this.answer);
        this.display();
    }
    
    display() {
        document.getElementById('prevOutput').textContent = this.prevInput;
        document.getElementById('currOutput').textContent = this.currInput;
    }
    
}

calculator = new Calculator();

document.addEventListener('keyup', (event) => {
    calculator.onKeyUp(event);
});