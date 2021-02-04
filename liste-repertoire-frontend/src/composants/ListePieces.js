import React from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';

function ListePieces({ pieces, handleClick, listeDemandes }) {
    if (pieces?.length) {
        var dictionnaireCategories = Object();

        pieces.forEach(piece => {
            piece.categories.forEach(categorie => {
                if (dictionnaireCategories[categorie] === undefined) {
                    dictionnaireCategories[categorie] = true;
                }
            })            
        });

        var categories = Object.keys(dictionnaireCategories);

        if (listeDemandes !== undefined) {
            var listeIdDemandes = Object.keys(listeDemandes);
        }   
        return (
            <>
                <Table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Titre
                                <Button variant="success" className="m-1" size="sm" >&uarr;</Button>
                                <Button variant="success" className="m-1" size="sm" >&darr;</Button>
                            </th>
                            <th>Artiste
                                <Button variant="success" className="m-1" size="sm" >&uarr;</Button>
                                <Button variant="success" className="m-1" size="sm" >&darr;</Button>
                            </th>
                            <th>Categorie
                                <Button variant="success" className="m-1" size="sm" >&uarr;</Button>
                                <Button variant="success" className="m-1" size="sm" >&darr;</Button>
                            </th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie) => {
                        const piecesAssociees = pieces.filter((piece) => 
                            piece.categories.indexOf(categorie) !== -1);
                            
                        return (
                            <>
                                {
                                    piecesAssociees.map(piece => {
                                        if (handleClick !== undefined) {
                                            if (listeIdDemandes.includes(piece._id)) {
                                                return <tr key={piece._id}>
                                                        <td>{piece.titre}</td>
                                                        <td>{piece.artiste}</td>
                                                        <td>{categorie}</td>
                                                        <Button variant="info" className="m-1" size="sm" onClick={() => handleClick(piece._id)}>Sélectionner</Button>
                                                        </tr>
                                            }
                                            else {
                                                return <tr key={piece._id}>
                                                        <td>{piece.titre}</td>
                                                        <td>{piece.artiste}</td>
                                                        <td>{categorie}</td>
                                                        <Button variant="success" className="m-1" size="sm" onClick={() => handleClick(piece._id)}>Ajouter</Button>
                                                        </tr>
                                            }
                                            
                                        }
                                        else {
                                            return <tr key={piece._id}>
                                                    <td>{piece.titre}</td>
                                                    <td>{piece.artiste}</td>
                                                    <td>{categorie}</td>
                                                    <Button variant="success" className="m-1" size="sm" >Ajouter</Button>
                                                    </tr>
                                        }
                                    })
                                    
                                }
                           </>
                        )
                    })}
                    </tbody>
                </Table>
            </>
        );
    }
    else {
        return <Alert variant={"info"} >Il n'y a pas de pièces dans le répertoire.</Alert>;
    }
}

export default ListePieces;  
      
