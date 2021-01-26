import {
    React,
    useState
} from 'react';

import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {UtiliseAuth} from '../context/auth'
import Alert from 'react-bootstrap/Alert';

function FormulaireConnection() {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const {setAuthentification} = UtiliseAuth();

    const connectionUtilisateur = async () => {
        const utilisateurjson = await fetch(`/api/utilisateurs/${nomUtilisateur}`);
        const utilisateur = await utilisateurjson.json();
        
        if(motPasse !== utilisateur.motDePasse){
            <Alert variant="Danger" >Mot de passe invalide!</Alert>
        }
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
            
            <Button variant="success" onClick={connectionUtilisateur}>
            Connection
            </Button>  
        </Form>
    </>
);
    

}

export default FormulaireConnection;