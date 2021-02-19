import React from 'react';
import FormulaireModifierDemande from '../composants/FormulaireModifierDemande';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import { useTranslation} from 'react-il8next';

function PageModifierDemande({ match }) {
    const id = match.params.id;
    const { t } = useTranslation();
    
    return (
        <>
            <h1>{t('modifierdemande')} {id}</h1>
            <FormulaireModifierDemande id={id} />
            <Link to="/liste-demandes-utilisateur">
                <Button variant={'danger'} >{t('annuler')}</Button>    
            </Link>
        </>
    ); 
}

export default PageModifierDemande;