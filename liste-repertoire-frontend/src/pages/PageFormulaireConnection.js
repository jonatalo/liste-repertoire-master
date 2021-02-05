import {
    React
} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormulaireConnection from '../composants/FormulaireConnection'

function PageFormulaireConnection()
{
    return (
        <>
            
            <h1>Connection utilisateur</h1>
            
            < FormulaireConnection />
            <Link to="/NouveauUtilisateur">
                <Button>Nouvelle Utilisateur</Button>    
            </Link>
        </>
    );
}


export default PageFormulaireConnection;