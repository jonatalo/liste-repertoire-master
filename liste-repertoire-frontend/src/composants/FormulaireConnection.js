import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Redirect } from 'react-router-dom';


function FormulaireConnection() {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const envoyerUtilisateur = async () => {
        // Enlever les chaînes vides de l'array
        const nouvellesCategories = categories.filter(categorie =>
            categorie !== '');

        await fetch(`/api/pieces/modifier/${id}`, {
            method: 'post',
            body: JSON.stringify({ titre, artiste, categories: nouvellesCategories }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setRediriger(true);
    };
return(
    <>
        <Form>
            <Form.Group> 
                <Form.Control type="text" id="login" class="fadeIn second" name="login" placeholder="login"
                    onChange={(event) => setNomUtilisateur(event.target.value)}
                />
            </Form.Group> 
            <Form.Group>
                <Form.Control type="text" id="password" class="fadeIn third" name="login" placeholder="password" 
                    onChange={(event) => setMotPasse(event.target.value)}
                />
            </Form.Group>
            
            <Button variant="success" onClick={envoyerUtilisateur}>
            Connection
            </Button>
            
         
            
            
        </Form>
        
    
    </>
);
    

}

export default FormulaireConnection;