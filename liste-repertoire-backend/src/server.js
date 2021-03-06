import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(_dirname, '/build')));

const utiliserDB = async (operations, reponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true});
        const db = client.db('liste-repertoire');

        await operations(db);

        client.close();
    }
    catch(erreur) {
        reponse.status(500).send("Erreur de connexion à la bd", erreur);
    }
};

app.get('/api/pieces', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find().toArray();
        reponse.status(200).json(listePieces);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
app.get('/api/pieces/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoPiece = await db.collection('pieces').findOne({ _id: objectId });
        reponse.status(200).json(infoPiece);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
});
app.get('/api/pieces/titre/:motRechercher', (requete, reponse) => {
    const titre = requete.params.motRechercher;

    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find({titre: new RegExp(titre, 'i')}).toArray();
        reponse.status(200).json(listePieces);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièces non trouvée")
    );
});
app.get('/api/pieces/artiste/:motRechercher', (requete, reponse) => {
    const artiste = requete.params.motRechercher;

    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find({artiste: new RegExp(artiste, 'i')}).toArray();
        reponse.status(200).json(listePieces);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièces non trouvée")
    );
});
app.get('/api/pieces/categorie/:motRechercher', (requete, reponse) => {
    const categorie = requete.params.motRechercher;

    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find({categories: new RegExp(categorie, 'i')}).toArray();
        reponse.status(200).json(listePieces);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièces non trouvée")
    );
});
app.put('/api/pieces/ajouter', (requete, reponse) => {
    const {titre, artiste, categories} = requete.body;

    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('pieces').insertOne({ 
                titre: titre,
                artiste: artiste,
                categories: categories
            });
            
            reponse.status(200).send("Pièce ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été ajoutée")
        );     
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categories: ${categories}`);
    }
});
app.post('/api/pieces/modifier/:id', (requete, reponse) => {
    const {titre, artiste, categories} = requete.body;
    const id = requete.params.id;

    if (titre !== undefined && artiste !== undefined && categories !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('pieces').updateOne({ _id: objectId }, {
                '$set': {
                    titre: titre,
                    artiste: artiste,
                    categories: categories
                }
            });
            
            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - titre: ${titre}
            - artiste: ${artiste}
            - categories: ${categories}`);
    }
});
app.delete('/api/pieces/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('pieces').deleteOne({ _id: objectId });
        
        reponse.status(200).send(`${resultat.deletedCount} pièce supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la pièce n'a pas été supprimée")
    );    
});

app.get('/api/utilisateurs', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeUtilisateur = await db.collection('utilisateurs').find().toArray();
        reponse.status(200).json(listeUtilisateur);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
app.get('/api/utilisateurs/:nomUtilisateur', (requete, reponse) => {
    const nomUtilisateur = requete.params.nomUtilisateur

    utiliserDB(async (db) => {
        const utilisateur = await db.collection('utilisateurs').findOne({nom: nomUtilisateur});
        reponse.status(200).json(utilisateur);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
app.put('/api/utilisateurs/ajouter', (requete, reponse) => {
    const {nomUtilisateur, motDePasse} = requete.body;

    if (nomUtilisateur !== undefined && motDePasse !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('utilisateurs').insertOne({ 
                nom:nomUtilisateur,
                motDePasse: motDePasse
            });
            
            reponse.status(200).send("Utilisateur ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : l'utilisateur n'a pas été ajoutée")
        );;        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${nomUtilisateur}
            - motDePasse: ${motDePasse}`);
    }
});


app.get('/api/demandes', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeDemandes = await db.collection('demandes').find().toArray();
        reponse.status(200).json(listeDemandes);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
app.get('/api/demandes/:id', (requete, reponse) => {
    const id = requete.params.id;
    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const infoDemande = await db.collection('demandes').findOne({ _id: objectId });
        reponse.status(200).json(infoDemande);      

    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
app.get('/api/demandes/parNom/:nom', (requete, reponse) => {
    const nom = requete.params.nom;

    if(nom !== undefined){
        utiliserDB(async (db) => {
            const listeDemandes = await db.collection('demandes').find({ nom: nom }).toArray();
            reponse.status(200).json(listeDemandes);
        }, reponse).catch(
            () => reponse.status(500).send("Erreur lors de la requête")
        );
    }
});
app.put('/api/demandes/ajouter', (requete, reponse) => {
    const {estActive,nom, pieces , date} = requete.body;

    if (nom !== undefined && pieces !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('demandes').insertOne({ 
                estActive:estActive,
                nom: nom,
                pieces: pieces,
                date:date
            });
            
            reponse.status(200).send("Demande ajoutée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la demande n'a pas été ajoutée")
        );       
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - nom: ${nom}
            - pieces: ${pieces}`);
    }
});
app.post('/api/demandes/modifier/:id', (requete, reponse) => {
    const estActive= requete.body.estActive;
    const pieces= requete.body.pieces;
    const date=new Date();
    const id = requete.params.id;

    if (estActive !== undefined ) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('demandes').updateOne({ _id: objectId }, {
                '$set': {
                    estActive: estActive,
                    date: date
                }
            });
            
            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );        
    }
    else if (pieces !== undefined) {
        utiliserDB(async (db) => {
            var objectId = ObjectID.createFromHexString(id);
            await db.collection('demandes').updateOne({ _id: objectId }, {
                '$set': {
                    pieces: pieces,
                    date: date
                }
            });
            
            reponse.status(200).send("Pièce modifiée");
        }, reponse).catch(
            () => reponse.status(500).send("Erreur : la pièce n'a pas été modifiée")
        );        
    }
    else {
        reponse.status(500).send(`Certains paramètres ne sont pas définis :
            - estActive: ${estActive}
            - pieces: ${pieces}`
        );
    }
});
app.delete('/api/demandes/supprimer/:id', (requete, reponse) => {
    const id = requete.params.id;

    utiliserDB(async (db) => {
        var objectId = ObjectID.createFromHexString(id);
        const resultat = await db.collection('demandes').deleteOne({ _id: objectId });
        
        reponse.status(200).send(`${resultat.deletedCount} demande supprimée`);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur : la demande n'a pas été supprimée")
    );
});

app.get('*', (requete, reponse) => {
    reponse.sendFile(path.join(_dirname + '/build/index.html'));
});

app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));