import React from 'react';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import FormulaireNouveauUtilisateur from '../composants/FormulaireNouveauUtilisateur';

function PageConnexionNouveauUtilisateur() {
    return (
    <>
        <h1>Ajouter un nouveau utilisateur</h1>
        <FormulaireNouveauUtilisateur />
        <Link to="/connection">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}

export default PageConnexionNouveauUtilisateur;