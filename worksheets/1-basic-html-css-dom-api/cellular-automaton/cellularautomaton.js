'strict'

class CellularAutomaton {
    
    constructor(rows, cols) {
        
        this.rows = rows;
        this.cols = cols;
        this.firstRow = new Array();
        this.cells = new Array();
        
        
        // first row is populated with random cells
        for(let i = 0; i < this.cols; i++) {
            
            // random 0 or 1
            let isActive = Math.floor(Math.random() * 2);

            let cell = new Cell(isActive);

            this.firstRow.push(cell);


        }
        
        this.cells.push(this.firstRow);
           
    }
    
    populate() {
        
        for(let i = 1; i < this.rows; i++) {
            
            let row = new Array();
            
            for(let j = 0; j < this.cols; j++) {
                
                let cell = new Cell(false);
                
                if(this.checkAncestors(j, this.cells[i - 1])) {
                    cell.activate();
                }
                
                row.push(cell);
                
            }
            
            console.log(i);
            
            this.cells.push(row);
            
        }
        
    }
    
    checkAncestors(currentIndex, ancestorRow) {
        
        // no left ancestor so check last cell in ancestor row
        if(currentIndex == 0) {
            return ancestorRow[this.cols - 1].isActive();
        }
        
        // no right ancestor so check first cell in ancestor row
        if(currentIndex == this.cols - 1) {
            return ancestorRow[0].isActive();
        }
        
        let rightAncestor = ancestorRow[currentIndex + 1];
        let leftAncestor = ancestorRow[currentIndex - 1];
        let directAncestor = ancestorRow[currentIndex];
        
        
        if(leftAncestor.isActive() && rightAncestor.isActive() && directAncestor.isActive()) {
            return false;
        }
        
        if(leftAncestor.isActive() && directAncestor.isActive()) {
            return false;
        }
        
        if(leftAncestor.isActive() && rightAncestor.isActive()) {
            return true;
        }
        
        if(leftAncestor.isActive()) {
           return true;
        }
        
        if(directAncestor.isActive() && rightAncestor.isActive()) {
            return true;
        }
        
        if(directAncestor.isActive()) {
            return true;
        }
        
        if(rightAncestor.isActive()) {
            return false;
        }
        
        if(!leftAncestor.isActive() && !rightAncestor.isActive() && !directAncestor.isActive()) {
            return false;
        }
        
        return false;
    }
    
    render() {
        
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                this.cells[i][j].render();
            }
        }
        
    }
    
}