//################################################################################################

//operator variable
let operator = ''

//all buttons variables
let btns = document.querySelectorAll("button")

//value Variables
let currVal = ''
let prevVal = ''

//display variables
let prevDisp = document.getElementById("prevD")
let currDisp = document.getElementById("currD")

//stores result globally
let result = ''

//################################################################################################

//adds click event listener to each button
btns.forEach(el =>{
    el.addEventListener("click", e =>{
//sets the clicked button's ID to the id variable
        let id = e.target.id;
               switch(id){
                case '+': shifter(id)
                    break
                case '-': shifter(id)
                    break
                case '×': shifter(id)
                    break
                case '÷': shifter(id)
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
    if(currVal.length < 10){
        if(key == '0' && currVal == '0' || key == '.' && currVal.includes('.')){return} 
        else {
            currVal += key;
            currDisp.innerHTML = currVal;
        }
    }
}

//clears displays and values
const ac = () =>{
    currVal = ''
    prevVal = ''
    currDisp.innerHTML = '0'
    prevDisp.innerHTML = ''
    operator = ''
}

//deletes last character in string
const del = () =>{
    if(currDisp.innerHTML == 'error'||currDisp.innerHTML == '0'){return}
    currVal = currVal.slice(0, -1)
    currDisp.innerHTML = currVal;
    if(currVal == ''){currDisp.innerHTML = '0'}
}

//shifts current value to previous value, and pushes it to prev disp, along with selected operator
const shifter = (oper) =>{
//if last digit is equal to '.', pressing an operator button will do nothing.
    if(currVal.slice(-1) == '.'){return}

//checks if all condtions for evaluation are satisfied
    if(currVal != '' && prevVal != '' && operator != ''){eval()}
    
//only pushes the current value, if the previous display is empty
    if(prevDisp.innerHTML == '' && currDisp.innerHTML != ''){prevVal = currVal}
   
//sets operator variable to selected operator, updates previous display, and clears the current val + disp
        operator = oper;
        prevDisp.innerHTML = `${prevVal}${oper}`
        currDisp.innerHTML = ''
        currVal = ''     
}

//evaluation function
const eval = () =>{
//only evaluates if all conditions are met
    if(currVal == '' || prevVal == '' || operator == ''){
        return
    }
//convert both values from strings to floats, ready for calculation
        currVal = parseFloat(currVal)
        prevVal = parseFloat(prevVal)
        switch(operator){
                case '+': result = prevVal + currVal;
                evalRender()
                    break
                case '-': result = prevVal - currVal;
                evalRender()
                    break
                case '×': result = prevVal * currVal;
                evalRender()
                    break
                case '÷': result = prevVal / currVal;
                evalRender()
                    break
    }
}

//pushes calculated result to current display
const evalRender = () =>{
//converts to string to allow, and sets it to the currVal, allowing user to modify result
    currVal = result.toString()
//if the length of the result is greater than 10, displays an error message, unless it contains a decimal
    if(currVal.length > 10 && currVal.includes('.') == false){
        currDisp.innerHTML = "error"
            return
    }
//shortens currVal to 10 (stops oerflow issues)
        currVal = currVal.substring(0, 10)
//clears prev  val + disp and displays result on curr disp
        currDisp.innerHTML = currVal
        prevDisp.innerHTML = ''
        prevVal = ''
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
        shifter(key)
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