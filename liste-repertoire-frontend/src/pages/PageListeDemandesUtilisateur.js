import {
    React,
    useState,
    useEffect
} from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import {UtiliseAuth} from '../context/auth'

function PageListeDemandesUtilisateur() {
    const [listeDemandes, setListeDemandes] = useState([]);
    const {nom} = UtiliseAuth();

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/demandes/parNom/${nom}`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeDemandes(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Demandes spéciales</h1>
            <ListGroup>
            {
                listeDemandes.map(demande => 
                    <ListGroup.Item>
                        <h4>{demande.nom}</h4>
                        <ul>
                        {
                            demande.pieces.map(piece => <li>{piece}</li>)
                        }
                        </ul>
                        <Link to={`/modifierDemande/${demande._id}`}>
                            <Button variant="success" className="m-1" size="sm" >Modifier</Button>
                        </Link>
                        <Link to={`/supprimerDemande/${demande._id}`}>
                            <Button variant="danger" className="m-1" size="sm" >Supprimer</Button>
                        </Link>
                    </ListGroup.Item>
                )
            }
            </ListGroup>
            
        </>
    );
}

export default PageListeDemandesUtilisateur;