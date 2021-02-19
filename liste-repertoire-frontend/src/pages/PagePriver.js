import {
    React,
    useState,
    useEffect
} from 'react';

import ListeClients from '../composants/ListeClients';
import { useTranslation} from 'react-il8next';

function PagePriver() {
    const [ListeClients, setListeClients] = useState([]);
    const { t } = useTranslation();
    
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
            <h1>{t('listerepertoire')}</h1>
            <ListeClients clients={ListeClients} />
        </>
    );
}

export default PagePriver;