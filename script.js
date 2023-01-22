let operator = ''

let btns = document.querySelectorAll("button")

let currVal = ''
let prevVal = ''

let prevDisp = document.getElementById("prevD")
let currDisp = document.getElementById("currD")

//################################################################################################

btns.forEach(el =>{
    el.addEventListener("click", e =>{
        let classCheck = e.target.className
        let id = e.target.id
            if(classCheck == "oper" || classCheck == "AC" || classCheck == "DEL"){
               switch(id){
                case 'plus': operator = id
                    break
                case 'minus': operator = id
                    break
                case 'times': operator = id
                    break
                case 'divide': operator = id
                    break
                case 'AC': ac()
                    break
                case 'DEL': return
                    default: return
            } 
            
        } else {
        if(currVal.length < 10){
                console.log("aaa");
            
            currVal += id
                currDisp.innerHTML = currVal
                } else {
                    return
                        } 
        }
    })
})

const ac = () =>{
    currVal = '', 
    prevVal = '', 
    currDisp.innerHTML = '',
    prevDisp.innerHTML = '', 
    operator = ''
}