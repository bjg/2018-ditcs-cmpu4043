class Calculator {
    
    constructor() {
        this.prevInput = ' ';
        this.currInput = '0';
    }
    
    buttonClick(value) {
        this.currInput = value;
        this.prevInput += this.currInput;
        this.display();
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