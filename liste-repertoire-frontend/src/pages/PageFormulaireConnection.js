import {
    React
} from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import FormulaireConnection from '../composants/FormulaireConnection'
import { useTranslation} from 'react-i18next';

function PageFormulaireConnection()
{
    const { t } = useTranslation();
    
    return (
        <>
            
            <h1>{t('connectionutilisateur')}</h1>
            
            < FormulaireConnection />
            <Link to="/NouveauUtilisateur">
                <Button>{t('nouvelleutilisateur')}</Button>    
            </Link>
        </>
    );
}


export default PageFormulaireConnection;