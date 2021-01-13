import {
    React,
    useState,
    useEffect
} from 'react';
import ListePiecesRepertoire from '../composants/ListePiecesRepertoire';

function PageAdmin() {
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Page Formulaire</h1>
            
            <h2>Liste du répertoire</h2>
            <ListePiecesRepertoire pieces={listePieces} />
        </>
    );
}

export default PageFormulaire;