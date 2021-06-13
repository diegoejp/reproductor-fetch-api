import { icon } from "@fortawesome/fontawesome-svg-core";
import { faBackward, faForward, faPlay, faStop, faPause} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useState } from "react";


function Reproductor(props){
    let lista =     [
          { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
          { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
          { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
      ]

      
    // let urlListo = "https://assets.breatheco.de/apis/sound/"+lista[props.indexCancion].url 

    let audio = createRef();
    const [iconoplay,setIconoPlay] = useState(<FontAwesomeIcon icon={faPlay}/>);
    
    function play(){
        if(audio.paused===false){
            audio.pause();
            setIconoPlay(<FontAwesomeIcon icon={faPlay}/>);
        }else{
            audio.play();
            setIconoPlay(<FontAwesomeIcon icon={faPause}/>);
        }
        
    }
    function stop(){
        audio.pause()
        audio.currentTime = 0;
        setIconoPlay(<FontAwesomeIcon icon={faPlay}/>);
        progress.style.width = 0 +"px";
        setProgreso("0:00");
    }
    function retroceder(){
        audio.currentTime = audio.currentTime -2;
    }
    function adelantar(){
        audio.currentTime = audio.currentTime +1;
    }
   
    let barra = createRef();
    

    let [progreso, setProgreso] = useState("0:00");
    let dur = createRef();
    let [duracion,setDuracion] = useState("0:00");
    let progress = createRef();
    let tiempo = createRef();
    let playpause = createRef();

    function posicion(posicion){
        if(props.seleccionada){
        let raton = posicion.pageX-barra.offsetLeft; // posicion del raton en mi barra
        console.log(raton);
        let nuevoTiempo = raton* audio.duration/barra.offsetWidth; // el element.offsetWidth me da el ancho del div
        audio.currentTime = nuevoTiempo;
        console.log(nuevoTiempo);
        progress.style.width = raton +"px";
        

        // let horas = Math.round(nuevoTiempo/3600);
        let minutos = Math.floor(nuevoTiempo/60)
        let segundos = Math.floor(nuevoTiempo%60);
        console.log("segundos: " + segundos);
        if(segundos>59){
            segundos = segundos-59;
        }
        if(segundos<10){
            segundos = "0"+segundos
        }
        
            

        setProgreso(minutos+":"+segundos);
        }
        
        
    }
   
    
    

    return(
        <div className={"row"}>
            <div className="col-md-12 mt5">
                <audio controls
                    //autoPlay //con esta linea hago que cuando se seleccione o cambie se autoreproduzca
                    ref={t=>audio =t}
                    src={"https://assets.breatheco.de/apis/sound/"+props.urlS}
                    value ={lista[props.indexCancion].name}
                    
                >
                </audio>
                <div className="barra" id="barra" ref={t=>barra = t} onMouseUp={posicion}  >
                    <div className="progreso" ref={t=>progress=t} style={{
                        width : "0px"
                    }}></div>
                    <p className="pro" ref={t=>tiempo=t}>{progreso}</p>
                    <p className="dur" ref={t=>dur=t}>0:00</p>
                </div>
              
            </div>
            
                {/* <progress style={{
                    width : "5px",
                    
                }}/> */}
                
            <div className="col-md-12 colorzila p-2 encabezado">
                <span className="p-2 textoblanco boton" onMouseDown={retroceder} onClick={props.btnAnterior}><FontAwesomeIcon icon={faBackward}/></span>
                <span className="p-2 textoblanco boton" onClick={play} ref={t=>playpause = t}>{iconoplay}</span>
                <span className="p-2 textoblanco boton " onClick={stop}><FontAwesomeIcon icon={faStop}/></span>
                <span className="p-2 textoblanco boton" onDoubleClick={adelantar} onClick={props.btnSiguiente}><FontAwesomeIcon icon={faForward}/></span>
                <input type="range" min="0" max="1" step="0.01" className="mright" onChange={(e)=>{
                    audio.volume =e.target.value;
                }}/>
               
                <span className="textoblanco">Reproduciendo :     {props.seleccionada}</span>
            </div>
        </div>
    )
}


export default Reproductor;