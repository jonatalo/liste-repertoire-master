import React from 'react';
import FormulaireModifierDemande from '../composants/FormulaireModifierDemande';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageModifierDemande({ match }) {
    const id = match.params.id;
    return (
        <>
            <h1>Modifier</h1>
            <FormulaireModifierDemande id={id} />
            <Link to="/repertoire">
                <Button variant={'danger'} >Annuler</Button>    
            </Link>
        </>
    ); 
}

export default PageModifierDemande;