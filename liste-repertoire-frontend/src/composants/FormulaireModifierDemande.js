import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ListePiecesDemande from '../composants/ListePiecesDemande';
import { Redirect } from 'react-router-dom';
import {useTranslation} from 'react-i18next';


function FormulaireModifierDemande({ id }) {
    const {t} =useTranslation();
    const [listeDemandeSpecial, setListeDemandeSpecial] = useState([]);
    const [listePieces, setListePieces] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [listeDemandes, setListeDemandes] = useState([]);
    const [rediriger, setRediriger] = useState(false);

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
    const envoyerFormulaire = async () => {
        const pieces = Object.values(listeDemandes);
        await fetch(`/api/demandes/modifier/${id}`, {
            method: 'post',
            body: JSON.stringify({ pieces: pieces }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setListeDemandes([]);
        setRediriger(true);
    };
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
        const nouvelleListeDemandes = [];
        Object.assign(nouvelleListeDemandes, listeDemandes);

        if (listeDemandes[id] === undefined) {
            const piece = listePieces.find((piece) => piece._id === id);            
            nouvelleListeDemandes[id] = `${piece.titre} - ${piece.artiste}`;            
        }
        else {
            delete nouvelleListeDemandes[id];
        }
        setListeDemandes(nouvelleListeDemandes);
        console.log({listeDemandes});
    }
    function afficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/liste-demandes-utilisateur" />
        }
    }
    if (listeDemandeSpecial !== undefined) {

        return (
            <>  
            {afficherRedirection()}
            <ListGroup>
                <ul>
                {
                    listeDemandeSpecial.map(piece => <li>{piece}</li>)
                }
                </ul>
            </ListGroup>
            
            <div>
                <h1>{t('messagepiecerepertoire')}</h1>
                <Form className="mb-1">
                    <Form.Group>
                        <Form.Control type="text" value={recherche} placeholder={t('entrerRecherche')}
                            onChange={(event) => setRecherche(event.target.value)} />
                    </Form.Group>
                </Form>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParTitre}>{t('recherchepartitre')}</Button>                
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParArtiste}>{t('rechercheparartiste')}</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParCategorie}>{t('rechercheparcategorie')}</Button>
                {setListeDemandes(Object.values({listeDemandeSpecial}))}
                {console.log()}
                <ListePiecesDemande pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes}/>
            </div>
            <Button onClick={envoyerFormulaire}>{t('envoyermodification')}</Button> 
            </>
        );
    }
    else {
        return <Alert variant={"info"} >{t('messagerepertoirevide')}</Alert>;
    }
}

export default FormulaireModifierDemande;