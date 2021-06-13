import { createRef } from "react";


function Probando(props){
    let input = createRef();
    let input2 = createRef();
    function PICO(){
        
        if(input.value !== ""){
            input.classList.add("bg-success");
            input.classList.remove("bg-danger");
    }else{
        input.classList.add("bg-danger");
        input.classList.remove("bg-success");
    }

    input2.value = input.value.toUpperCase();
    }


    
    console.log(input);

    return(
        <>
        <input type="text" ref={t=>input=t}  onChange={PICO}/>
        <input type="text" ref={t=>input2=t}  />
        </>
    )
}



export default Probando;