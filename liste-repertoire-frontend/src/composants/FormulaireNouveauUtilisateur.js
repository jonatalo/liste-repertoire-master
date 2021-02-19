import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';
import {useTranslation} from 'react-i18next';

function FormulaireNouveauUtilisateur(){
    const {t} =useTranslation();
    const [nomUtilisateur, setNomUtilsateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaireUtilisateur = async () => {
        const utilisateurjson = await fetch(`/api/utilisateurs/${nomUtilisateur}`);
        const utilisateur = await utilisateurjson.json();

        if(ConfirmerMotDePasse() && utilisateur == null){
            await fetch(`/api/utilisateurs/ajouter`, {
                method: 'put',
                body: JSON.stringify({ nomUtilisateur, motDePasse }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setRediriger(true);
        }
    }

    function afficherRedirection() {
        if (rediriger === true) {
            return <Redirect to="/" />
        }
    }

    function ConfirmerMotDePasse(){
        
        if(motDePasse == confirmationMotDePasse && motDePasse !== ''){
            return true;
        }
        else {
            return false;
        }
    }
    return (
        <>
            {afficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>{t('nomutilisateur')}</Form.Label>
                    <Form.Control type="text" value={nomUtilisateur} required="required"
                        onChange={(event) => setNomUtilsateur(event.target.value)} />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>{t('motdepasse')} </Form.Label>
                    <Form.Control type="password" value={motDePasse} required="required" 
                        onChange={(event) => setMotDePasse(event.target.value)} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>{t('confirmationmotdepasse')}</Form.Label>
                    <Form.Control type="password" value={confirmationMotDePasse} required="required" minLength="8"maxLength="16"
                        onChange={(event) => setConfirmationMotDePasse(event.target.value)} />
                </Form.Group> 
                
    
                <Button variant="primary" onClick={envoyerFormulaireUtilisateur} >
                {t('ajouterutilisateur')}
                </Button>
            </Form>
        </>
        );
}

export default FormulaireNouveauUtilisateur;