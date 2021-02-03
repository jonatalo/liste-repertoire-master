import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListePieceTest from '../composants/ListePieceTest';


function FormulaireModifierDemande({ id }) {
    const [listeDemandeSpecial, setListeDemandeSpecial] = useState(['']);
    const [listePieces, setListePieces] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [listeDemandes, setListeDemandes] = useState({});

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandes/${id}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandeSpecial(body.pieces);
        };
        chercherDonnees();
    }, [id]);
    if( listePieces.length == 0 && recherche == ''){
        RecherDefault();
    }
    function RecherDefault(){
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }
    function RechercheParTitre(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/titre/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        else{
            RecherDefault();
        }  
    }
    function RechercheParArtiste(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/artiste/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        else{
            RecherDefault();
        } 
    }
    function RechercheParCategorie(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/categorie/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        else{
            RecherDefault();
        }  
    }
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
    if (listeDemandeSpecial != undefined) {

        return (
            <>  
            <ListGroup>
                <ul>
                {
                    listeDemandeSpecial.map(piece => 
                        <li>{piece}
                        <Link to={`/supprimer/${piece._id}`}>
                            <Button variant="danger" className="m-1" size="sm" >Supprimer</Button>
                        </Link>                                        
                    </li>  
                    )
                }
                </ul>
            </ListGroup>
            
            <div>
                <h1>Ajouter vos demandes spéciales</h1>
                <Form className="mb-1">
                    <Form.Group>
                        <Form.Control type="text" value={recherche} placeholder="Entrer votre recherche ici" 
                            onChange={(event) => setRecherche(event.target.value)} />
                    </Form.Group>
                </Form>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParTitre}>Recherche par titre</Button>                
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParArtiste}>Recherche par artiste</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParCategorie}>Recherche par categorie</Button>
                <ListePieceTest pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes}/>
            </div>
            <Button >
                Envoyer la demande
            </Button>   
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default FormulaireModifierDemande;