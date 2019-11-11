let displayAnswer = false
const input = document.getElementById("result");

const buttonClicked = (characterClicked) => {
    //Clear the result bar after the answer has been displayed and a new number was clicked
    if (displayAnswer) clearInput()

    if(!validateInput(input.value + characterClicked)){
        if (input.value === '0') input.value = characterClicked
        else input.value = input.value + characterClicked
    }
}

const newInput = (value) => {
    if (displayAnswer) clearInput()
    let input = value[value.length -1]

    if(validateInput(value)) {
        document.getElementById('result').value = value.slice(0, -1)
    }else {
        //If input is not one of those keys, then delete that input
        if (!((input === '0') || (input === '1') || (input === '2') || (input === '3') || (input === '4') || (input === '5')
            || (input === '6') || (input === '7') || (input === '8') || (input === '9') || (input === '+') || (input === '-')
            || (input === 'x') || (input === '/')|| (input === '(') || (input === ')') || (input === 'c'))) {

            document.getElementById('result').value = value.slice(0, -1)
        }
    }
    if(input === 'c') clearInput()
    if(input === '=') calculate()
}

const validateInput = (value) => {
    //First character cant be ( or x or /
    const firstCharacter = value.charAt(0)
    if (firstCharacter === ')' || firstCharacter === 'x' || firstCharacter === '/') return true
    else return false
}

const clearInput = () => {
    document.getElementById("result").value = ''
    displayAnswer = false
}

const calculate = () => {
    displayAnswer = true

    let input = document.getElementById("result").value.replace('x', '*')

    try {
        document.getElementById("result").value = eval(String(input))
    }
    catch(err) {
        document.getElementById("result").value = 'Error, try again'
    }
}