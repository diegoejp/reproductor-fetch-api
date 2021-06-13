
function Cuerpo(props){
   
    return (
                        <li   
                        onClick={props.onClick}
                        className={"p-2 encabezado sinp"}
                        >
                           {props.contenido}
                        </li>
    )
}


export default Cuerpo;