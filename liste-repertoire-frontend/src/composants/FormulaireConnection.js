import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {UtiliseAuth} from '../context/auth'

function FormulaireConnection() {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const {setAuthentification} =UtiliseAuth();

    const envoyerUtilisateur = async () => {
        

        await fetch(`/api/pieces/modifier/${nomUtilisateur}`, {
            method: 'post',
            body: JSON.stringify({ nomUtilisateur,motPasse }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
return(
    <>
        <Form>
            <Form.Group> 
                <Form.Control type="text"  class="fadeIn second" name="login" placeholder="login"
                    onChange={(event) => setNomUtilisateur(event.target.value)}
                />
            </Form.Group> 
            <Form.Group>
                <Form.Control type="password" class="fadeIn third" name="login" placeholder="password" 
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