import {
    React,
    useState,
    useEffect
} from 'react';
import ListePieceTest from '../composants/ListePieceTest';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';


function PageModifierDemande({ id }) {
    const [listePieces, setListePieces] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [listeDemandes, setListeDemandes] = useState({});
    
    useEffect(() => {
        const chercherDonneesDemande = async () => {
            const resultat = await fetch(`/api/demandes/${id}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandes(body);
        };
        chercherDonneesDemande();
    }, []);

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
    /*
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
    */
    return (
        <>
            <h1>Demandes spéciales</h1>
            <ListGroup>
                <h4>{listeDemandes.nom}</h4>
                <ul>
                {
                    listeDemandes.pieces.map(piece => <li>{piece.titre} - {piece.artiste}</li>)
                }
                </ul>
            </ListGroup>
            
        </>
    );
    /*             
    return (
        <>
            <div>
                <h1>Envoyer une demande spéciale</h1>
                <Form className="mb-1">
                    <Form.Group>
                        <Form.Label>Votre nom: Mathieu</Form.Label>
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
            <Link to={`/liste-demandes-utilisateur`}>
                <Button variant="success" className="m-1" size="sm" >Afficher demande spécial</Button>
            </Link>
        </>
    );
    */
}

export default PageModifierDemande;