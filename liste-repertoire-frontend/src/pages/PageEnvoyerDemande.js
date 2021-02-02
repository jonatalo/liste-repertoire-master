import {
    React,
    useState,
    useEffect
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import ListePieces from '../composants/ListePieces';
import { Redirect } from 'react-router-dom';
import {FaAngleUp } from "react-icons/fa";
import {FaAngleDown } from "react-icons/fa";
import {UtiliseAuth} from '../context/auth'


function PageEnvoyerDemande() {
    const [listePieces, setListePieces] = useState([]);
    const [listeDemandes, setListeDemandes] = useState({});
    const [confirmation, setConfirmation] = useState(false);
    const [CategorieTrie,setCategorieTrie]=useState("Rien");
    const [PieceTrie,setPieceTrie]=useState("Rien");
    const [NomArtisteTrie,setNomArtisteTrie]=useState("Rien");
    const [estActive]=useState(true);
    const [date]=useState(new Date());

    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categories, setCategories] = useState('f');
    const {nom} = UtiliseAuth();
    
    useEffect(() => {
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        
    } , []);

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
    function changerCategorieTrie() {
        
        if (CategorieTrie == "Croissant") {
          setCategorieTrie("Decroissant");
        } 
        else {
            setCategorieTrie("Croissant");
        }
      }

      function changerPieceTrie() {
        
        if (PieceTrie == "Croissant") {
          setPieceTrie("Decroissant");
        } 
        else {
            setPieceTrie("Croissant");
        }
      }
      function changerNomArtisteTrie() {
        
        if (NomArtisteTrie == "Croissant") {
          setNomArtisteTrie("Decroissant");
        } 
        else {
            setNomArtisteTrie("Croissant");
        }
      }
      //<Button onClick={changerEtat(CategorieTrie,setCategorieTrie)}> Categorie  </Button>
    return (
        <>
            <h1>Envoyer une demande spéciale</h1>
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Votre nom: {nom}</Form.Label>
                </Form.Group>
            </Form>

            <Button onClick={changerCategorieTrie}> Categorie  </Button>
            
            <ListePieces pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes} trieCategorie={CategorieTrie} trieArtiste={NomArtisteTrie} trieTitre={PieceTrie} />

            <Button onClick={envoyerDemande} >
                Envoyer la demande
            </Button>

            {afficherConfirmation()}
        </>
    );
}

export default PageEnvoyerDemande;