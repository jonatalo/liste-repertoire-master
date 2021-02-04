import {
    React,
    useState,
    useEffect
} from 'react';

import ListePieceRepertoire from '../composants/ListePieceRepertoire';

function PageRepertoire() {
    const [listePieces, setListePieces] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/pieces`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListePieces(body);
        };
        chercherDonnees();
    }, []);
//un nouveau components pour le répertoire est nécessaire
    return (
        <>
            <h1>Liste du répertoire</h1>
            
            <ListePieceRepertoire pieces={listePieces} />
        </>
    );
}

export default PageRepertoire;