import {
    React,
    useState
} from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {UtiliseAuth} from '../context/auth'
import Alert from 'react-bootstrap/Alert';
import { Redirect } from 'react-router-dom';

function FormulaireConnection() {
    const [nomUtilisateur, setNomUtilisateur] = useState('');
    const [motPasse, setMotPasse] = useState('');
    const {authentification,setAuthentification} = UtiliseAuth();
    const {setNom} = UtiliseAuth();
    const [rediriger, setRediriger] = useState(false);

    const connectionUtilisateur = async () => {
        const utilisateurjson = await fetch(`/api/utilisateurs/${nomUtilisateur}`);
        const utilisateur = await utilisateurjson.json();
        
        if(motPasse !== utilisateur.motDePasse){
            <Alert variant="Danger" >Mot de passe invalide!</Alert>
        }
        else{
            if(nomUtilisateur=='admin'){
                setAuthentification(2);
            }
            else{
                setAuthentification(1);
            }
        }
        setNom(nomUtilisateur);
        setRediriger(true);
    }
    function afficherRedirection() {
        if (rediriger === true) {
            if (authentification == 1) {
                return <Redirect to="/demande-speciale" />
            }
            else if (authentification == 2) {
                return <Redirect to="/admin" />
            }
        }
    }
return(
    <>
    {afficherRedirection()}
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