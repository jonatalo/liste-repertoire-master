import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';


function ListePieceTest({ pieces }) {
    const [CategorieTrie,setCategorieTrie]=useState("Rien");
    const [PieceTrie,setPieceTrie]=useState("Rien");
    const [NomArtisteTrie,setNomArtisteTrie]=useState("Rien");

    if (pieces?.length) {
        var dictionnaireCategories = Object();
        var dictionnairePiece = Object();
        var dictionnaireArtiste = Object();
        pieces.forEach(piece => {
            piece.categories.forEach(categorie => {
                if (dictionnaireCategories[categorie] === undefined) {
                    dictionnaireCategories[categorie] = true;
                }
            })            
        });
       


        const categories = Object.keys(dictionnaireCategories);
        //ne pas oublier de modifier les path dans le server
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
                                    piecesAssociees.map(piece => 
                                    <tr key={piece._id}>
                                    <td>{piece.titre}</td>
                                    <td>{piece.artiste}</td>
                                    <td>{categorie}</td>
                                    </tr>)
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

export default ListePieceTest;