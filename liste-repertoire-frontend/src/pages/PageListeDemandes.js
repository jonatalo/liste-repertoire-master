import {
    React,
    useState,
    useEffect
} from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup';

import Button from 'react-bootstrap/Button';
import {UtiliseAuth} from '../context/auth'

function PageListeDemandes() {
    const [listeDemandes, setListeDemandes] = useState([]);
    const [estActive,setEstActive]=useState(false);
    const [date,setDate]=useState();
    const [pieces, setPieces] = useState([]);
    const {nom} = UtiliseAuth();

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandes`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandes(body);
        };
        chercherDonnees();
        
    }, []);
     function chercherDonneeUnique(id) {
        const resultat =  fetch(`/api/demandes/${id}`);
        const body =  resultat.json().catch((error) => {console.log(error)});
        setEstActive(body.estActive);
        setDate(body.date);
        setPieces(body.pieces);
    
    };

     function ChangerEtat(id){
        chercherDonneeUnique(id);
        fetch(`/api/demande/modifier/${id}`, {
            method: 'post',
            body: JSON.stringify({ estActive,nom, pieces , date}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
    };

    return (
        <>
            <h1>Demandes spéciales</h1>
            <ListGroup>
            {
                listeDemandes.map(demande => 
                    <ListGroup.Item key={demande._id}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Checkbox aria-label="estActive" checked={demande.estActive} />
                                <InputGroup.Text>test</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <h4>{demande.nom}</h4>
                        <ul>
                        {
                            demande.pieces.map(piece => <li>{piece}</li>)
                        }
                        </ul>
                        
                        <Button onClick={() => ChangerEtat(demande._id)}> Rendre Actif/Inatif  </Button>
                        
                    </ListGroup.Item>
                )
            }
            </ListGroup>
            
        </>
    );
}

export default PageListeDemandes;