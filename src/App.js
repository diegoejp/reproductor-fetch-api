import './App.css';
import Titulo from "./Componentes/titulo";
import Cuerpo from "./Componentes/cuerpo"
import { useEffect, useState } from 'react';
import Reproductor from "./Componentes/reproductor";
import Menu from "./Componentes/menu";

 


function App() {
  //  let lista =     [
  //         { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
  //         { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
  //         { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"}
  //     ]

  const [lista, setLista] = useState({
    canciones : null
  });

  async function consulta(){
    try {
      const response = await fetch("https://assets.breatheco.de/apis/sound/songs",{
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }

      });
      if(response.status ===404) throw new Error ("pagina no existe csm!");

      const data = await response.json();
      console.log(data);
      setLista({
        ...lista,
        canciones : data});
        
     
    } catch (error) {
      console.log(error);
    }
  
  }

  console.log(lista.canciones); 

  useEffect(()=>{
    consulta();
    
  },[]);

  

       
     const [cancion, setCancion] = useState({
       nombre : null,
       url : null,
       id : null,
       indice : 0,
       
     });  

    // function selectCancion(e){
    //   setCancion({nombre : e.name,
    //             url : e.url
    //             });
    //   console.log(cancion);
    // }  
     function anterior(){
       if(cancion.indice>0){
                setCancion({
            
               nombre : lista.canciones[cancion.indice-1].name,
               url : lista.canciones[cancion.indice-1].url,
               id : lista.canciones[cancion.indice-1].id,
               indice : cancion.indice-1
           })
             }
     }


     function siguiente(){
       if(cancion.indice<lista.length-1){
                setCancion({
            
             nombre : lista.canciones[cancion.indice+1].name,
               url : lista.canciones[cancion.indice+1].url,
               id : lista.canciones[cancion.indice+1].id,
               indice : cancion.indice+1
         })
           }
            
     }


   
    
  
  return (
    <>
    <div className="container fondo">
        <Titulo />
        <Menu/>
              <div className="row">
            <div className="col-md-12 encabezado">
              <ul className="p-2">
                {
                !! lista.canciones &&
                lista.canciones.map((value,index)=>{
              return(
                <Cuerpo
                className={(cancion.indice===index?"bg-primary":"")}
                key={value.id}
                contenido={value.name}
                onClick={(e)=>{setCancion({
                  nombre : value.name,
                  url : value.url,
                  id : value.id,
                  indice : index,
                  
                })
              
              
              }}
                />
              )
            })
              }
              </ul>
            </div>
        </div>
        {!! lista.canciones &&     
        <Reproductor  seleccionada={cancion.nombre} urlS={cancion.url} indexCancion={cancion.indice}
        btnAnterior={anterior} btnSiguiente={siguiente} data={lista.canciones}
        />
        } 
    </div>
    </>
  );
}

export default App;
