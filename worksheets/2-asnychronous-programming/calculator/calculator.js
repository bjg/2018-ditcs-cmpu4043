let expression = ''
const error = document.getElementById('error')
const input = document.getElementById('input')

const displayError = (errorMessage) => error.innerText = errorMessage
const removeError = () => error.innerText = ''


const clearInput = () => {
    updateInput('')
    expression = ''
}


const updateInput = (value) => {
    input.value = value
    removeError()
}


const validateParentheses = (string, finalExpression) => {
    const parenthesis = []

    //store an array of all the parenthesis
    for (const char of string){
        if (char === '(' || char === ')'){
            parenthesis.push(char)
        }
    }

    let parenthesisError = {
        error: false,
        message: ''
    }


    //main algorithm is to look for first open ) with a ( beside it e.g (()) inner one would be the one we pop first
    let loop = true
    while (loop){

        if (parenthesis.length === 0) break

        //if first character ignore it unless we they are submitting that as their expression
        //open parenthesis is fine if its not a final expression
        if (parenthesis.length === 1 && parenthesis[0] === '('){
            if (finalExpression){
                parenthesisError.error = true
                parenthesisError.message = 'Opening parenthesis without a closing parenthesis'
            }
            break
        }

        //if all there is opening parenthesis and it isnt the final expression then its fine
        if (!parenthesis.includes(')') && finalExpression){
            parenthesisError.error = true
            parenthesisError.message = 'Opening parenthesis without a closing parenthesis'
            break
        }else if (!parenthesis.includes(')') && !finalExpression) break

        //look for first closing bracket and check left index for its opening bracet
        for (const i in parenthesis){
            if (parenthesis[i] === ')'){
                if (parenthesis[i - 1] !== '('){
                    parenthesisError.error = true
                    parenthesisError.message = 'Closing parenthesis without an opening parenthesis'
                    loop = false

                }else {
                    //remove the closing bracket along with the opening bracet
                    parenthesis.splice(i - 1, 2)
                }

                break
            }

        }
    }


    return parenthesisError
}


const updateExpression = (value) => {
    const validation = validateParentheses(expression + value, false)
    if (validation.error){
        displayError(validation.message)
        return false
    }else {
        const tempExpression = expression + value
        if (tempExpression[0] === 'x' || tempExpression[0] === '÷' || tempExpression[0] === '+') return false

        expression = tempExpression
        updateInput(expression)
        return true
    }
}


const validateTypedInput = (inputVal) => {
    var pattern = '0123456789()+=-x./=c'
    const inputChracter = inputVal[inputVal.length - 1]


    if (event.inputType === 'deleteContentBackward'){
        expression = expression.slice(0, -1);
        return
    }


    if(pattern.includes(inputChracter)){
        if (inputChracter === '='){
            solve()
        }else if (inputChracter === 'c'){
            clearInput()
        }else {
            const success = updateExpression(inputChracter)
            if (!success) input.value = inputVal.slice(0, -1);
        }

    }else input.value = inputVal.slice(0, -1);

}


const solve = () => {
    const validation = validateParentheses(expression, true)

    if (!validation.error){
        expression = expression.replace('÷', '/')
        expression = expression.replace('x', '*')
        removeError()

        try{
            updateInput(eval(String(expression)))
        }catch(err){
            updateInput('Invalid expression')
        }
        expression = ''
    }else {
        displayError(validation.message)
    }
}