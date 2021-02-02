import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient, ObjectID } from 'mongodb';

const app = express();

app.use(bodyParser.json());

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
// liste de clients
app.get('/api/utilisateurs', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeUtilisateur = await db.collection('utilisateurs').find().toArray();
        reponse.status(200).json(listeUtilisateur);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});
//clients
app.get('/api/utilisateurs/:nomUtilisateur', (requete, reponse) => {
    const nomUtilisateur = requete.params.nomUtilisateur

    utiliserDB(async (db) => {
        const utilisateur = await db.collection('utilisateurs').findOne({nom: nomUtilisateur});
        reponse.status(200).json(utilisateur);
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
/*
app.put('/api/pieces/:filtrer', (requete, reponse) => {
    const titre = requete.params.filtrer.titre;
    const artiste = requete.params.filtrer.artiste;
    const categories = requete.params.filtrer.categories;
>>>>>>> ddf26b3453ec4720bc06cc0c29153d5f8bf0d77d
    
    if(titre !== undefined){
        titre = "";
    }
    if(artiste !== undefined){
        artiste = "";
    }
    if(categorie !== undefined){
        categorie = "";
    }
    utiliserDB(async (db) => {
        const listePieces = await db.collection('pieces').find({
            $and: [ 
                {titre: new RegExp(titre, 'i')},
                {artiste: new RegExp(artiste, 'i')},
                {categories: new RegExp(categorie, 'i')}
            ]
        }).toArray();

        reponse.status(200).json(listePieces);      
    }, reponse).catch(
        () => reponse.status(500).send("Pièce non trouvée")
    );
});
*/
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
//Ajouter Clients
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

app.get('/api/demandes', (requete, reponse) => {
    utiliserDB(async (db) => {
        const listeDemandes = await db.collection('demandes').find().toArray();
        reponse.status(200).json(listeDemandes);
    }, reponse).catch(
        () => reponse.status(500).send("Erreur lors de la requête")
    );
});

app.put('/api/demandes/ajouter', (requete, reponse) => {
    const {nom, pieces} = requete.body;

    if (nom !== undefined && pieces !== undefined) {
        utiliserDB(async (db) => {
            await db.collection('demandes').insertOne({ 
                nom: nom,
                pieces: pieces
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
app.listen(8000, () => console.log("Serveur démarré sur le port 8000"));