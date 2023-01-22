let operator = ''
let curr = ''
let prev = ''
let prevD = document.getElementById("prevD")
let currD = document.getElementById("currD")
let btns = document.querySelectorAll("button")


btns.forEach(el =>{
    el.addEventListener("click", e =>{

        let classCheck = e.target.className
        let id = e.target.id

//check if operator btn was clicked, store the operator in a variable.
            if(classCheck == "oper"){
               switch(id){
                case 'plus': operator = id
                    break
                case 'minus': operator = id
                    break
                case 'times': operator = id
                    break
                case 'divide': operator = id
                    break
               } 
            }
    })
})