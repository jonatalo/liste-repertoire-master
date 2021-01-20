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
    
    {/*à enlever */}
    const [titre, setTitre] = useState('');
    const [artiste, setArtiste] = useState('');
    const [categories, setCategories] = useState(['']);
    const [rediriger, setRediriger] = useState(false);

    return (
        <>
            {afficherRedirection()}
            <Form className="mb-1">
                <Form.Group>
                    <Form.Label>Nom utilisateur</Form.Label>
                    <Form.Control type="text" value={nomUtilisateur} 
                        onChange={(event) => setNomUtilsateur(event.target.value)} />
                </Form.Group>
    
                <Form.Group>
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="text" value={motDePasse} 
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group>
                
                <Form.Group>
                    <Form.Label>Confirmation mot de passe</Form.Label>
                    <Form.Control type="text" value={confirmationMotDePasse} 
                        onChange={(event) => setArtiste(event.target.value)} />
                </Form.Group> 
    
                <Button variant="primary" onClick={envoyerFormulaireUtilisateur} >
                    Ajouter utilisateur
                </Button>
            </Form>
        </>
        );
}

export default FormulaireConnection;