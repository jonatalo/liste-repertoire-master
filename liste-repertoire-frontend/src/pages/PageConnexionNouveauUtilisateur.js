import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import FormulaireNouveauUtilisateur from '../composants/FormulaireNouveauUtilisateur';
import { useTranslation} from 'react-i18next';

function PageConnexionNouveauUtilisateur() {
    const { t } = useTranslation();
    
    return (
    <>
        <h1>{t('ajouternouveauutilisateur')}</h1>
        <FormulaireNouveauUtilisateur />
        <Link to="/connection">
            <Button variant={'danger'} >{t('annuler')}</Button>    
        </Link>
    </>
    );    
}

export default PageConnexionNouveauUtilisateur;