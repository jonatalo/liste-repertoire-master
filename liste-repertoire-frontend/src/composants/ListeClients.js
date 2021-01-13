import React from 'react';
import Alert from 'react-bootstrap/Alert'

function ListeClients({ clients }) {
    if (clients?.length) {
        var dictionnaireIDs = Object();

        clients.forEach(client => {
            if (dictionnaireIDs[client.id] === undefined) {
                dictionnaireIDs[client.id] = true;
            }
        });

        const idClients = Object.keys(dictionnaireIDs);

        return (
            <>
                {idClients.map((id) => {
                    const clientsGeneral = clients.filter((client) => client.id === id);
                    return (
                        <div key={idClients}>
                            <h4>{id}</h4>
                            <ul>
                                {
                                    clientsGeneral.map(client => <li key={client.id}>{client.prenom} - {client.nom}</li>)
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