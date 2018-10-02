'strict'

class Cell {
    
    constructor(isActive) {
        this.active = isActive;
    }
    
    activate() {
        this.active = true;
    }
    
    deactivate() {
        this.active = false;
    }
    
    isActive() {
        return this.active;
    }
    
    render(node) {
        
        const div = document.createElement("div");
        
        if(this.active) {
            div.style.backgroundColor = "black";
        } else {
            div.style.backgroundColor = "white";
        }
        
        div.style.width = "8px";
        div.style.height = "8px";
        div.style.border = "1px solid black";
        
        document.body.appendChild(div);
        
    }
    
}