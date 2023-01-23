//################################################################################################

//operator variable
let operator = ''

//all buttons variables
let btns = document.querySelectorAll("button")

//value variables
let currentValue = ''
let previousValue = ''

//display variables
let subDisplay = document.getElementById("prevD")
let mainDisplay = document.getElementById("currD")

//stores result globally
let result = ''

//################################################################################################


//adds click event listener to each button
btns.forEach(el =>{
    el.addEventListener("click", e =>{
//sets the clicked button's ID to the id variable
let id = e.target.id;
    switch(id){
    case '+': operatorPressed(id)
        break
    case '-': operatorPressed(id)
        break
    case '×': operatorPressed(id)
        break
    case '÷': operatorPressed(id)
        break
    case 'AC': ac()
        break
    case 'DEL': del()
        break
    case 'equal': eval()
        break
    default: numToDisp(id)           
        }
    })
})


//pushes number to display
const numToDisp = key =>{
//only if the current lenght is less than 10
    if(currentValue.length < 10){
        if(key == '0' && currentValue == '0' || key == '.' && currentValue.includes('.')){return} 
        else {
            currentValue += key;
            mainDisplay.innerHTML = currentValue;
        }
    }
}


//clears displays and values
const ac = () =>{
    currentValue = ''
    previousValue = ''
    mainDisplay.innerHTML = '0'
    subDisplay.innerHTML = ''
    operator = ''
}


//deletes last character in string
const del = () =>{
//ignores if string = 'error'
    if(mainDisplay.innerHTML == 'error'||mainDisplay.innerHTML == '0'){return}
//the slice method which removes last character
    currentValue = currentValue.slice(0, -1)
    mainDisplay.innerHTML = currentValue;
    if(currentValue == ''){mainDisplay.innerHTML = '0'}
}


//shifts current value to previous value, and pushes it to sub display, along with selected operator
const operatorPressed = (oper) =>{
//ignores if last digit is '.', or if only 0 is displayed
    if(currentValue.slice(-1) == '.' || mainDisplay.innerHTML == '0'){return}
//checks if all condtions for evaluation are satisfied
    if(currentValue != '' && previousValue != '' && operator != ''){eval()}
//only pushes the current value, if the sub display is empty
    if(subDisplay.innerHTML == '' && mainDisplay.innerHTML != ''){previousValue = currentValue}
   
//sets operator variable to selected operator, updates sub display, and clears the current val + disp
        operator = oper;
        subDisplay.innerHTML = `${previousValue}${oper}`
        mainDisplay.innerHTML = ''
        currentValue = ''     
}


//evaluation function
const eval = () =>{
//only evaluates if all conditions are met
    if(currentValue == '' || previousValue == '' || operator == '' || mainDisplay.innerHTML == '.'){
        return
    }
//convert both values from strings to floats, ready for calculation
        currentValue = parseFloat(currentValue)
        previousValue = parseFloat(previousValue)
        switch(operator){
                case '+': result = previousValue + currentValue;
                evalRender()
                    break
                case '-': result = previousValue - currentValue;
                evalRender()
                    break
                case '×': result = previousValue * currentValue;
                evalRender()
                    break
                case '÷': result = previousValue / currentValue;
                evalRender()
                    break
    }
}


//pushes calculated result to main display
const evalRender = () =>{
//converts to string to allow, and sets it to the currentValue, allowing user to modify result
    currentValue = result.toString()
//if the length of the result is greater than 10, displays an error message, unless it contains a decimal
    if(currentValue.length > 10 && currentValue.includes('.') == false){
        mainDisplay.innerHTML = "error"
            return
    }
//shortens currentValue to 10 (stops oerflow issues)
        currentValue = currentValue.substring(0, 10)
//clears prev  val + disp and displays result on main display
        mainDisplay.innerHTML = currentValue
        subDisplay.innerHTML = ''
        previousValue = ''
}


//listens for key presses
document.addEventListener('keydown', function(event) {
//sets the key variable to key pressed
    let key = event.key;
    if (key == 'Enter'){eval()}
    if (key == 'Backspace'){del()}
    if (key == '+' || key == '-' || key == '*' || key == '/'){
        if(key == '/'){key = '÷'}
        if(key == '*'){key = '×'}
        operatorPressed(key)
    }
    if (key == '.'){numToDisp(key)}
//ensures letters wont be pushed to disp by converting key to integer then to string, and check if  the result is "NaN"
    key =  parseInt(key)
    key = key.toString()
    if(key != 'NaN'){
        numToDisp(key)
    }
});

//################################################################################################