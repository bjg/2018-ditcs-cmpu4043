// Defining the calculator document
const result = document.getElementById("calculator");

// Funciton for clicking on buttons
const clicks = (number) => {
    result.screen.value = result.screen.value + number;
}

// Fliping aritchemtic operators + and -
const plusminus = () => {
    result.screen.value = result.screen.value * -1;
}

// Whiping the screen
const whipe = () => {
    result.screen.value = '';
}

// Result of the operation
const solution = () => {
    result.screen.value = eval(result.screen.value);
}
