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
import { Redirect } from 'react-router-dom';


function FormulaireModifierDemande({ id }) {
    const [listeDemandeSpecial, setListeDemandeSpecial] = useState(['']);
    const [nomUtilisateur, setNomUtilisateur] = useState("");
    const [estActive, setEstActive] = useState(true);
    const [date, setDate] = useState(new Date());

    const [listePieces, setListePieces] = useState([]);

    const [recherche, setRecherche] = useState('');
    const [listeDemandes, setListeDemandes] = useState({});
    const [rediriger, setRediriger] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandes/${id}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandeSpecial(body.pieces);
            setNomUtilisateur(body.nom);
            setEstActive(body.estActive);
            setDate(body.date)
        };
        chercherDonnees();

    }, [id]);
    if( listePieces.length == 0 && recherche == ''){
        RecherDefault();

    }
    function envoyerFormulaireModification(){
        var nouvelleListeDemande = [];

        if(listeDemandes !== undefined){
            nouvelleListeDemande = listeDemandes;
        }
        else{
            nouvelleListeDemande = listeDemandeSpecial;
        }
        const envoyerFormulaire = async () => {
            await fetch(`/api/demandes/modifier/${id}`, {
                method: 'post',
                body: JSON.stringify({  estActive:estActive, nom:nomUtilisateur, pieces:nouvelleListeDemande , date:date }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
            setConfirmation(true);
        };
        envoyerFormulaire();
    }
    function RecherDefault(){
        const chercherDonneesRecherche = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonneesRecherche();
    }
    function RechercheParTitre(){
        if(recherche !== ''){
            const chercherDonneesTitre = async () => {
                const resultat = await fetch(`/api/pieces/titre/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonneesTitre();
        }
        else{
            RecherDefault();
        }  
    }
    function RechercheParArtiste(){
        if(recherche !== ''){
            const chercherDonneesArtiste = async () => {
                const resultat = await fetch(`/api/pieces/artiste/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonneesArtiste();
        }
        else{
            RecherDefault();
        } 
    }
    function RechercheParCategorie(){
        if(recherche !== ''){
            const chercherDonneesCategorie = async () => {
                const resultat = await fetch(`/api/pieces/categorie/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonneesCategorie();
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
    function afficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/repertoire" />
        }
    }
    function afficherConfirmation() {
        if (confirmation === true) {
            return <Alert variant="success" >La demande a bien été envoyée.</Alert>
        }
    }
    if (listeDemandeSpecial != undefined) {

        return (
            <>  
            {afficherRedirection()}
            <ListGroup>
                <ul>
                {
                    listeDemandeSpecial.map(piece => 
                    <li>{piece}</li>  
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
            <Button onClick={envoyerFormulaireModification}>Envoyer la modification</Button> 
            {afficherConfirmation()}  
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default FormulaireModifierDemande;