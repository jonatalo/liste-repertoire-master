import {
    React,
    useState,
    useEffect
} from 'react';

import ListePiecesAdmin from '../composants/ListePiecesAdmin';

import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useTranslation} from 'react-i18next';



function PageAdmin() {
    const {t} = useTranslation();
    const [listePieces, setListePieces] = useState([]);

    
    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>{t('pageadministrateur')}</h1>

            <Link to="/ajouter">
                <Button>{t('ajouternouvellepiece')}</Button>    
            </Link>
            
            <h2>{t('listerepertoire')}</h2>
            <ListePiecesAdmin pieces={listePieces} />


            <Link to="/liste-demandes">
                <Button>{t('voirdemandesspéciales')}</Button>
            </Link>
            

        </>
    );
}

export default PageAdmin;