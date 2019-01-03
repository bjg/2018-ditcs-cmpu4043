const createCell = (color, clear) =>
{
    let div = document.createElement("div");
    div.style.width = "8px";
    div.style.height = "8px";
    div.style.margin = "1px";
    div.style.borderColor = "black";
    div.style.borderStyle = "solid";
    div.style.float = "left";
    div.style.backgroundColor = color;
    div.style.clear = clear;

    return div;
}

let grid = [];
const rows = 50;
const cols = 101;

for(let i = 0; i < cols; ++i)
{
    grid[i] = [];
}

for(let i = 0; i < rows; ++i)
{
    for(let j = 0; j < cols; ++j)
    {
        let active;
        
        if(i === 0)
        {
            active = Math.random() >= .5 ? true : false;
        }
        else
        {
            if(j === 0)
            {
                active = grid[i - 1][cols - 1];
            }
            else if(j === cols - 1)
            {
                active = grid[i - 1][0];
            }
            else
            {
                if((grid[i - 1][j - 1] && grid[i - 1][j] && grid[i - 1][j + 1]) ||
                   (grid[i - 1][j - 1] && grid[i - 1][j] && !grid[i - 1][j + 1]) ||
                   (!grid[i - 1][j - 1] && !grid[i - 1][j] && grid[i - 1][j + 1]) ||
                   (!grid[i - 1][j - 1] && !grid[i - 1][j] && !grid[i - 1][j + 1]))
                {
                    active = false;
                }
                else if((grid[i - 1][j - 1] && !grid[i - 1][j] && grid[i - 1][j + 1]) ||
                        (grid[i - 1][j - 1] && !grid[i - 1][j] && !grid[i - 1][j + 1]) ||
                        (!grid[i - 1][j - 1] && grid[i - 1][j] && grid[i - 1][j + 1]) ||
                        (!grid[i - 1][j - 1] && grid[i - 1][j] && !grid[i - 1][j + 1]))
                {
                    active = true;
                }
            }
        }
        
        grid[i][j] = active;
        
        document.body.appendChild(createCell(active ? "black" : "white", j === 0 ? "both" : "none"));
    }
}