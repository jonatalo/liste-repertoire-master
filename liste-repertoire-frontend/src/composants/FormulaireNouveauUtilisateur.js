import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';

function FormulaireConnection(){
    const [nomUtilisateur, setNomUtilsateur] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMotDePasse, setConfirmationMotDePasse] = useState('');
    const [rediriger, setRediriger] = useState(false);

    const envoyerFormulaireUtilisateur = async () => {
        // Enlever les chaînes vides de l'array
        
            {/*à modifier*/}
        await fetch(`/api/utilisateur/ajouter`, {
            method: 'post',
            body: JSON.stringify({ nomUtilisateur, motDePasse }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };

    function afficherRedirection() {
        if (rediriger === true) {
            {/*à voir ou l'on redirige*/}
            return <Redirect to="/admin" />
        }
    }
    function ConfirmerNomUtilisateur(){
        {/*à voir*/}
        const utilisateurjson = await fetch(`/api/utilisateur/${nomUtilisateur}`);
        const utilisateur = await utilisateurjson.json();
{/*à voir ce qu'une requete null renvoie */}
        if(utilisateur === null){
            return true;
        }
        else{
            return <Alert variant="Danger" >L'utilisateur existe déja</Alert>
        }

    }

    function ConfirmerMotDePasse(){
        if(motDePasse === confirmationMotDePasse){
            return true;
        }
        else {
            return <Alert variant="Danger" >Les mots de passes sont différents</Alert>
        }
    }
    return (
        <>
            {afficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom utilisateur</Form.Label>
                    {/*demander ou vérifier si required exist */}
                    <Form.Control type="text" value={nomUtilisateur} required="required"
                        onChange={(event) => setNomUtilsateur(event.target.value)} />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="text" value={motDePasse} required="required"
                        onChange={(event) => setMotDePasse(event.target.value)} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Confirmation mot de passe</Form.Label>
                    <Form.Control type="text" value={confirmationMotDePasse} required="required"
                        onChange={(event) => setConfirmationMotDePasse(event.target.value)} />
                </Form.Group> 
    
                <Button variant="primary" onClick={envoyerFormulaireUtilisateur} >
                    Ajouter utilisateur
                </Button>
            </Form>
        </>
        );
}

export default FormulaireConnection;