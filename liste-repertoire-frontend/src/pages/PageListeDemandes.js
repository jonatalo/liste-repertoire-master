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
    const [demandePresente,setDemandePresente]=useState();
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
    async function chercherDonneeUnique(demandeTraiterID) {
        const resultat = await fetch(`/api/demandes/${demandeTraiterID}`);
        const body =  await resultat.json();
        setDemandePresente(body);
    
    };

    async function ChangerEtat({demande}){
        const constDemande={_id:"",estActive:"",nom:"",pieces:[],date:""};
        var demandeTraiter=Object.create(constDemande);
        demandeTraiter=demande;
        demandeTraiter.estActive= !demandeTraiter.estActive;
        chercherDonneeUnique(demandeTraiter._id);

        const modifierActif=async ()=>{
            await fetch(`/api/demandes/modifier/${demandeTraiter._id}`, {
                method: 'post',
                body: JSON.stringify({ estActive:demandeTraiter.estActive, nom:demandeTraiter.nom, pieces:demandeTraiter.pieces , date:demandeTraiter.date}),
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
        }
        modifierActif();
    
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
                                <InputGroup.Checkbox aria-label="estActive" checked={demande.estActive} onChange={() => ChangerEtat({demande})} />
                                <InputGroup.Text>Actif</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                        <h4>{demande.nom}</h4>
                        <ul>
                        {
                            demande.pieces.map(piece => <li key={piece.nom}>{piece}</li>)
                        }
                        </ul>
                    </ListGroup.Item>
                )
            }
            </ListGroup>
            
        </>
    );
}

export default PageListeDemandes;