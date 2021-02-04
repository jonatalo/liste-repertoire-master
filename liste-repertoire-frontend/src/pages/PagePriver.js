import {
    React,
    useState,
    useEffect
} from 'react';

import ListeClients from '../composants/ListeClients';

function PagePriver() {
    const [ListeClients, setListeClients] = useState([]);

    useEffect(() => {
        const chercherDonnees = async () => {
            const resultat = await fetch(`/api/clients`);
            const body = await resultat.json().catch((error) => {console.log(error)});
            setListeClients(body);
        };
        chercherDonnees();
    }, []);

    return (
        <>
            <h1>Liste du répertoire</h1>
            <ListeClients clients={ListeClients} />
        </>
    );
}

export default PagePriver;