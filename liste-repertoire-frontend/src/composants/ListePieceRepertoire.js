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
                    {pieceMusicales.map(piece => {
                           if(typeof (piece.categories)!="string"){    
                        return(
                            <>  
                                <tr>  
                                <td>{piece.titre}</td>
                                <td>{piece.artiste}</td>
                                {piece.categories.map(categorie =>{
                                    return(
                                        <>
                                        
                                            <p>{categorie}</p>
                                       
                                        </>
                                    );
                                    }
                                    )
                                }
                                 </tr>
                            </>
                         );
                        }
                        else
                        {
                            return(
                                <>  
                                    <tr>  
                                    <td>{piece.titre}</td>
                                    <td>{piece.artiste}</td>
                                    <td>{piece.categories}</td>
                                     </tr>
                                </>
                        );
                    }})}
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
      
