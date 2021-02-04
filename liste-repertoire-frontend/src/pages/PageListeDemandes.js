import {
    React,
    useState,
    useEffect
} from 'react';

import InputGroup from 'react-bootstrap/InputGroup'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {UtiliseAuth} from '../context/auth'
import { Table } from 'react-bootstrap';
import {FaAngleUp } from "react-icons/fa";
import {FaAngleDown } from "react-icons/fa";

function PageListeDemandes() {
    const [listeDemandes, setListeDemandes] = useState([]);
    const [demandePresente,setDemandePresente]=useState();
    const [date,setDate]=useState();
    const [pieces, setPieces] = useState([]);
    const {nom} = UtiliseAuth();
    const [NomDuDemandeurTrie, setNomDudemandeurTrie ]= useState("Rien");
    const [DateTrie, setDateTrie ]= useState("Rien");
    
    
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
                body: JSON.stringify({ estActive:demandeTraiter.estActive,pieces:demandeTraiter.pieces}),
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
        }
        modifierActif();
    
    };
    var listeDemandeSpecial = listeDemandes;
    if(NomDuDemandeurTrie == "Croissant"){

        listeDemandeSpecial = listeDemandes;
        listeDemandeSpecial= listeDemandeSpecial.sort((demandeA, demandeB) => 
        demandeA.nom.toLowerCase().localeCompare(demandeB.nom.toLowerCase()) 
        );
            setNomDudemandeurTrie("Rien");
    }
    else if (NomDuDemandeurTrie == "Decroissant"){
        
       
        listeDemandeSpecial = listeDemandes;
        listeDemandeSpecial= listeDemandeSpecial.sort((demandeA, demandeB) => 
            demandeA.nom.toLowerCase().localeCompare(demandeB.nom.toLowerCase())*-1 
            );
            setNomDudemandeurTrie("Rien");
    }
    if(DateTrie == "Croissant"){
       
        listeDemandeSpecial = listeDemandes;
       listeDemandeSpecial= listeDemandeSpecial.sort((demandeA, demandeB) => 
            demandeA.date.toLowerCase().localeCompare(demandeB.date.toLowerCase())
            );
            setDateTrie("Rien");
    }
    else if (DateTrie == "Decroissant"){
        
        listeDemandeSpecial = listeDemandes;
       listeDemandeSpecial= listeDemandeSpecial.sort((demandeA, demandeB) => 
            demandeA.date.toLowerCase().localeCompare(demandeB.date.toLowerCase())*-1
            );
            setDateTrie("Rien");
    }

    return (
        <>
            <h1>Demandes spéciales</h1>
        
                <Table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Nom du Demandeur
                                <Button variant="success" className="m-1" size="sm" onClick={() => setNomDudemandeurTrie("Croissant")} ><FaAngleUp /></Button>
                                <Button variant="success" className="m-1" size="sm" onClick={() => setNomDudemandeurTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>Date
                                <Button variant="success" className="m-1" size="sm" onClick={() => setDateTrie("Croissant")}><FaAngleUp /></Button>
                                <Button variant="success" className="m-1" size="sm" onClick={() => setDateTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>Piece</th>     
                            <th>Actif</th>                        
                        </tr>
                    </thead>
                    <tbody>
                        {listeDemandeSpecial.map(demande => {
                                return(

                                <tr key={demande._id}>
                                    <td>{demande.nom}</td>
                                    <td>{demande.date}</td>
                                    <td>
                                       {demande.pieces.map(piece =>{
                                           {console.log(piece)}
                                           return(
                                               <p key={piece.nom}>{piece}</p>
                                           )
                                       } )}
                                    </td>
                                    <td>
                                    <input type="checkbox" aria-label="estActive" checked={demande.estActive} onChange={() => ChangerEtat({demande})} />

                                    </td>

                                </tr>
                                );
                            }
                          )
                        }
                    </tbody>
                </Table>
            
            
        </>
    );
}

export default PageListeDemandes;