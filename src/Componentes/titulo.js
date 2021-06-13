import { faMusic} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Titulo(){
    return(
        <div className="row encabezado p-2 colorzila">
            <div className="col-md-12">
                <span className="m-2"><FontAwesomeIcon icon={faMusic}/></span>
                <span>Diego Reproductor</span>
                <span className="m-2"><FontAwesomeIcon icon={faMusic}/></span>

            </div>
        </div>
    );
}


export default Titulo;