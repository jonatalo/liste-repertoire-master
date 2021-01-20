import React from 'react';
import FormulaireAjouterPiece from '../composants/FormulaireAjouterPiece';
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

function PageConnexionNouveauUtilisateur() {
    return (
    <>
        <h1>Ajouter un nouveau utilisateur</h1>
        <FormulaireNouveauUtilisateur />
        {/*Modifier le path */}
        <Link to="/admin">
            <Button variant={'danger'} >Annuler</Button>    
        </Link>
    </>
    );    
}

export default PageConnexionNouveauUtilisateur;