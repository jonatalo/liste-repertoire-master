import {
    React,
    useState,
    useEffect
} from 'react';
import ListePieceTest from '../composants/ListePieceTest';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


function PageTest() {
    const [listePieces, setListePieces] = useState([]);
    const [recherche, setRecherche] = useState('');

    
    useEffect(() => {
        RecherDefault();
    }, []);
    function RecherDefault(){
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }
    function RechercheParTitre(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/titre/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        RecherDefault();
    }
    function RechercheParArtiste(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/artiste/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        RecherDefault();
    }
    function RechercheParCategorie(){
        if(recherche !== ''){
            const chercherDonnees = async () => {
                const resultat = await fetch(`/api/pieces/categorie/${recherche}`);
                const body = await resultat.json().catch((error) => {console.log(error)});
                setListePieces(body);
            };
            chercherDonnees();
        }
        RecherDefault();
    }
      //mettre le text de recherche dans le haut de la page.
    return (
        <>
            <div>
                <h1>Envoyer une demande spéciale</h1>
                <Form className="mb-1">
                    <Form.Group>
                        <Form.Label>Votre nom: Mathieu</Form.Label>
                        <Form.Control type="text" value={recherche} placeholder="Entrer votre recherche ici" 
                            onChange={(event) => setRecherche(event.target.value)} />
                    </Form.Group>
                </Form>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParTitre}>Recherche par titre</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParArtiste}>Recherche par artiste</Button>
                <Button variant="success" className="m-1" size="sm" onClick={RechercheParCategorie}>Recherche par categorie</Button>
                <ListePieceTest pieces={listePieces} />
            </div>

            <Button > Categorie  </Button>
        

            <Button >
                Envoyer la demande
            </Button>
        </>
    );
}

export default PageTest;