import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListeClients({ clients }) {
    if (clients?.length) {
        var dictionnaireCategories = Object();

        clients.forEach(client => {
            if (dictionnaireIDs[client.id] === undefined) {
                dictionnaireIDs[client.id] = true;
            }
        });

        const categories = Object.keys(dictionnaireIDs);

        return (
            <>
                {categories.map((id) => {
                    const clientsAssociees = clients.filter((client) => client.id === id);
                    return (
                        <div key={categorie}>
                            <h4>{categorie}</h4>
                            <ul>
                                {
                                    clientsAssociees.map(client => <li key={client.id}>{client.prenom} - {client.nom}</li>)
                                }
                            </ul>
                        </div>
                    )
                })}
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListeClients;