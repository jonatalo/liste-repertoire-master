import {
    React,
    useState,
    useEffect
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import ListePieces from '../composants/ListePieces';
import {UtiliseAuth} from '../context/auth'

function PageEnvoyerDemande() {
    const [listePieces, setListePieces] = useState([]);
    const [listeDemandes, setListeDemandes] = useState({});
    const [confirmation, setConfirmation] = useState(false);

    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categorie, setCategories] = useState('');
    const {nom} = UtiliseAuth();
   

    useEffect(() => {
        if(titre == '' && artiste == '' && categorie == ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        else{
       
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/filtrer`,{
                    method: 'get',
                    body: JSON.stringify({titre, artiste, categorie}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        console.log(window.location.pathname);
    }, []);

    const envoyerDemande = async () => {
        const pieces = Object.values(listeDemandes);

        await fetch(`/api/demandes/ajouter`, {
            method: 'put',
            body: JSON.stringify({ nom, pieces }),
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
                    <Form.Label>Votre nom: {nom}</Form.Label>
                </Form.Group>
            </Form>
            <ListePieces pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes} />

            <Button onClick={envoyerDemande} >
                Envoyer la demande
            </Button>

            {afficherConfirmation()}
        </>
    );
}

export default PageEnvoyerDemande;