import {
    React,
    useState,
    useEffect
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import ListePiecesDemande from '../composants/ListePiecesDemande';
import {FaAngleUp } from "react-icons/fa";
import {FaAngleDown } from "react-icons/fa";
import {UtiliseAuth} from '../context/auth'
import { Link } from 'react-router-dom';


function PageEnvoyerDemande() {
    const [listePieces, setListePieces] = useState([]);
    const [listeDemandes, setListeDemandes] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [date]=useState(new Date());
    const {nom} = UtiliseAuth();
    const [estActive]=useState(true);
    const [recherche, setRecherche] = useState('');
    

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

    const envoyerDemande = async () => {
        const pieces = Object.values(listeDemandes);
        await fetch(`/api/demandes/ajouter`, {
            method: 'put',
            body: JSON.stringify({ estActive,nom, pieces , date}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setListeDemandes({});
        setConfirmation(true);
    };

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

    function afficherConfirmation() {
        if (confirmation === true) {
            return <Alert variant="success" >La demande a bien été envoyée.</Alert>
        }
    }
    return (
        <>
            <h1>Envoyer une demande spéciale</h1>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Bonjour : {nom}</Form.Label>
                    <Form.Control type="text" value={recherche} placeholder="Entrer votre recherche ici" 
                            onChange={(event) => setRecherche(event.target.value)} />
                </Form.Group>
            </Form>
            <Button variant="success" className="m-1" size="sm" onClick={RechercheParTitre}>Recherche par titre</Button>                
            <Button variant="success" className="m-1" size="sm" onClick={RechercheParArtiste}>Recherche par artiste</Button>
            <Button variant="success" className="m-1" size="sm" onClick={RechercheParCategorie}>Recherche par categorie</Button>
            <ListePiecesDemande pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes}/>

            <Button onClick={envoyerDemande} >
                Envoyer la demande
            </Button>
            <Link to={`/liste-demandes-utilisateur`}>
                <Button variant="success" className="m-1" size="sm" >Afficher demande spécial</Button>
            </Link>
            {afficherConfirmation()}
        </>
    );
}

export default PageEnvoyerDemande;