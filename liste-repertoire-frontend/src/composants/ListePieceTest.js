import {
    React,
    useState,
    useEffect
} from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import {FaAngleUp } from "react-icons/fa";
import {FaAngleDown } from "react-icons/fa";


function ListePieceTest({ pieces }) {
    const [CategorieTrie,setCategorieTrie]=useState("Rien");
    const [PieceTrie,setPieceTrie]=useState("Rien");
    const [NomArtisteTrie,setNomArtisteTrie]=useState("Rien");

    if (pieces?.length) {
        var dictionnaireCategories = Object();
        var dictionnairePieces = Object();
        var dictionnaireArtistes = Object();
        pieces.forEach(piece => {
            piece.categories.forEach(categorie => {
                if (dictionnaireCategories[categorie] === undefined) {
                    dictionnaireCategories[categorie] = true;
                }
            })            
        });
        pieces.forEach(piece => {
            
                if (dictionnaireArtistes[piece.artiste] === undefined) {
                    dictionnaireArtistes[piece.artiste] = true;
                }
                        
        });
        pieces.forEach(piece => {
            
            if (dictionnairePieces[piece.titre] === undefined) {
                dictionnairePieces[piece.titre] = true;
            }
                    
    });

        var artistes = Object.keys(dictionnaireArtistes);
        var titres = Object.keys(dictionnairePieces);
        var categories = Object.keys(dictionnaireCategories);
        //ne pas oublier de modifier les path dans le server
        if(CategorieTrie == "Croissant")
        {
            categories = categories.sort((categorie1, categorie2) => 
            categorie1.toLowerCase().localeCompare(categorie2.toLowerCase()) 
            );// sort une function lamda

        }
        else if (CategorieTrie == "Decroissant")
        {
           categories = categories.sort((categorie1, categorie2) => 
            categorie1.toLowerCase().localeCompare(categorie2.toLowerCase()) * -1 
            );// sort une function lamda

        }

        // voir la matier de useState pour faire les trie

        
        return (
            <> 
                <Table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Titre
                                <Button variant="success" className="m-1" size="sm" onClick={() => setPieceTrie("Croissant")} ><FaAngleUp /></Button>
                                <Button variant="success" className="m-1" size="sm" onClick={() => setPieceTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>Artiste
                                <Button variant="success" className="m-1" size="sm" onClick={() => setNomArtisteTrie("Croissant")}><FaAngleUp /></Button>
                                <Button variant="success" className="m-1" size="sm" onClick={() => setNomArtisteTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>Categorie
                                <Button variant="success" className="m-1" size="sm" onClick={() => setCategorieTrie("Croissant")} ><FaAngleUp /></Button>
                                <Button variant="success" className="m-1" size="sm" onClick={() => setCategorieTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie) => {
                        var piecesAssociees = pieces.filter((piece) => 
                            piece.categories.indexOf(categorie) !== -1);
                        if(NomArtisteTrie == "Croissant")
                        {
                            piecesAssociees =piecesAssociees.sort((categorie1, categorie2) => 
                                categorie1.artiste.toLowerCase().localeCompare(categorie2.artiste.toLowerCase()) 
                                );// sort une function lamda
                           
                        }
                        else if (NomArtisteTrie == "Decroissant")
                        {
                            piecesAssociees = piecesAssociees.sort((categorie1, categorie2) => 
                                categorie1.artiste.toLowerCase().localeCompare(categorie2.artiste.toLowerCase()) * -1 
                                );// sort une function lamda
                             
                        }

                            if(PieceTrie == "Croissant")
                            {
                                piecesAssociees =piecesAssociees.sort((categorie1, categorie2) => 
                                categorie1.titre.toLowerCase().localeCompare(categorie2.titre.toLowerCase()) 
                                );// sort une function lamda
                        
                            }
                            else if (PieceTrie == "Decroissant")
                            {
                                piecesAssociees = piecesAssociees.sort((categorie1, categorie2) => 
                                categorie1.titre.toLowerCase().localeCompare(categorie2.titre.toLowerCase()) * -1 
                                );// sort une function lamda
                        
                            }
                        
                        return (
                            <>
                                {
                                    piecesAssociees.map(piece => 
                                    <tr>
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