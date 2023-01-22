let operator = ''

let btns = document.querySelectorAll("button")

let currVal = ''
let prevVal = ''

let prevDisp = document.getElementById("prevD")
let currDisp = document.getElementById("currD")

let result = ''

//################################################################################################

btns.forEach(el =>{
    el.addEventListener("click", e =>{
    if(currDisp.innerHTML == 'NaN'|| prevDisp.innerHTML == 'NaN'){
        ac()
    }
        let classCheck = e.target.className
        let id = e.target.id
            if(classCheck != 'nums'){
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
                case 'DEL': currVal = currVal.slice(0, -1)
                            currDisp.innerHTML = currVal
                    break
                case 'equal': eval()
            } 
            
    } else {
        if(currVal.length < 10){
            if(id == '0' && currVal == '0'){
                return
            } else if( id == '.' && currVal.includes('.')){
                return
            } else {
                currVal += id
                currDisp.innerHTML = currVal
                
                }        
            }
        }
    })
})

const ac = () =>{
    currVal = ''
    prevVal = ''
    currDisp.innerHTML = ''
    prevDisp.innerHTML = ''
    operator = ''
}

const shifter = (oper) =>{
    if(oper == '/'){oper = '÷'}
    if(oper == '*'){oper = '×'}
    const lastDigit = currVal.slice(-1)
    if(lastDigit == '.'){
        return
    }
    
    if(currVal != '' && prevVal != '' && operator != ''){
        eval()
    } 
    if(currVal == '' && prevVal == ''){
        return
    }
    
    if(prevDisp.innerHTML == '' && currDisp.innerHTML != ''){
        prevVal = currVal
    }
        operator = oper
        prevDisp.innerHTML = `${prevVal}${oper}`
        currDisp.innerHTML = ''
        currVal = ''
}

const eval = () =>{
    if(currVal == '' || prevVal == '' || operator == ''){
        return
    } 
        currVal = parseFloat(currVal)
        prevVal = parseFloat(prevVal)
        switch(operator){
                case '+': result = prevVal + currVal
                evalRender()
                    break
                case '-': result = prevVal - currVal
                evalRender()
                    break
                case '×': result = prevVal * currVal
                evalRender()
                    break
                case '÷': result = prevVal / currVal
                evalRender()
                    break
    }
}

const evalRender = () =>{
    currVal = result.toString()
    currVal = currVal.substring(0, 10)
    currDisp.innerHTML = currVal
    prevDisp.innerHTML = ''
    prevVal = ''
    return
}

document.addEventListener('keydown', function(event) {
    if(currVal.length < 10){
        let key = event.key;
        if(key == '0' && currVal == '0'){return}
        if( key == '.' && currVal.includes('.') == false){
            currVal += key
                currDisp.innerHTML = currVal
                    return
        }
        if (key == 'Enter'){eval()}
        if (key == 'Backspace'){
            currVal = currVal.slice(0, -1)
                currDisp.innerHTML = currVal
        } if (key == '+' || key == '-' || key == '*' || key == '/'){shifter(key)}
    key =  parseInt(key)
            key = key.toString()
                if(key != 'NaN'){
                    currVal += key
                    currDisp.innerHTML = currVal
                }
        }
});