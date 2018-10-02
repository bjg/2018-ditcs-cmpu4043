'strict'

function start() {
    
    document.body.style.cssText = `
    width: 808px;
    display: grid; 
    grid-template-columns: repeat(101, 1fr); 
    grid-template-rows: repeat(50, 1fr); 
    `;
    
    let automaton = new CellularAutomaton(50, 101);
    
    automaton.populate();
    
    automaton.render();
    
}