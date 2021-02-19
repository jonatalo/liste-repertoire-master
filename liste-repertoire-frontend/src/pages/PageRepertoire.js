import {
    React,
    useState,
    useEffect
} from 'react';
import ListePieces from '../composants/ListePieces';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useTranslation} from 'react-i18next';

function PageRepertoire() {
    const [listePieces, setListePieces] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [listeDemandes, setListeDemandes] = useState({});
    const { t } = useTranslation();
    
    if( listePieces.length !== 0 && recherche == ''){
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
    return (
        <>
            <div>
                <h1>{t('listerepertoire')}</h1>
                <Form className="mb-1">
                    <Form.Group>
                        <Form.Control type="text" value={recherche} placeholder="Entrer votre recherche ici" 
                            onChange={(event) => setRecherche(event.target.value)} />
                    </Form.Group>
                </Form>

                <Button variant="success" className="m-1" size="sm" onClick={RechercheParTitre}>{t('recherchepartitre')}</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParArtiste}>{t('rechercheparartiste')}</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParCategorie}>{t('rechercheparcategorie')}</Button>
                <ListePieces pieces={listePieces} handleClick={handleClickPiece} listeDemandes={listeDemandes}/>

            </div>
        </>
    );
}

export default PageRepertoire;