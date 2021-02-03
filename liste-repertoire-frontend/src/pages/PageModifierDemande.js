import {
    React,
    useState,
    useEffect
} from 'react';
import FormulaireModifierDemande from '../composants/FormulaireModifierDemande';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


function PageModifierDemande({ id }) {
    const [listePieces, setListePieces] = useState([]);
    const [listeDemandes, setListeDemandes] = useState({});
    
    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    function handleClickPiece(id) {
        const nouvelleListeDemandes = {};
        Object.assign(nouvelleListeDemandes, listeDemandes);

        if (listeDemandes[id] === undefined) {
            const piece = listePieces.find((piece) => piece._id === id);            
            nouvelleListeDemandes[id] = `${piece.titre} - ${piece.artiste}`;            
        }
        else {
            delete nouvelleListeDemandes[id];
        }

        setListeDemandes(nouvelleListeDemandes);
    }             
    return (
        <>
            <div>
                <h1>Modifier une demande spéciale</h1>
                <h4>Votre nom: Mathieu</h4>
                <FormulaireModifierDemande pieces={listeDemandes} handleClick={handleClickPiece} listeDemandes={listeDemandes}/>
            </div>
            <Button >
                Envoyer la demande
            </Button>
            <Link to={`/liste-demandes-utilisateur`}>
                <Button variant="success" className="m-1" size="sm" >Modifier la demande spécial</Button>
            </Link>
        </>
    );
}

export default PageModifierDemande;