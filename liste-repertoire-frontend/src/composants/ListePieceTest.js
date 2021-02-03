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

        if(CategorieTrie == "Croissant")
        {
            
        }
        else if (CategorieTrie == "Decroissant")
        {
           

        }

        // voir la matier de useState pour faire les trie
        if(NomArtisteTrie == "Croissant")
        {
            pieces =pieces.sort((pieceA, pieceB) => 
                pieceA.artiste.toLowerCase().localeCompare(pieceB.artiste.toLowerCase()) 
                );// sort une function lamda
                setNomArtisteTrie("rien");
           
        }
        else if (NomArtisteTrie == "Decroissant")
        {
            pieces =pieces.sort((pieceA, pieceB) => 
                pieceA.artiste.toLowerCase().localeCompare(pieceB.artiste.toLowerCase())*-1 
                );// sort une function lamda
                setNomArtisteTrie("rien");
        }
        if(PieceTrie == "Croissant")
        {
            pieces =pieces.sort((pieceA, pieceB) => 
                pieceA.titre.toLowerCase().localeCompare(pieceB.titre.toLowerCase()) 
                );
                setPieceTrie("Rien");
        }
        else if (PieceTrie == "Decroissant")
        {
            pieces =pieces.sort((pieceA, pieceB) => 
                pieceA.titre.toLowerCase().localeCompare(pieceB.titre.toLowerCase())*-1 
                );// sort une function lamda
                setPieceTrie("Rien");
        }
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
                        
                        
                        { pieces.map(piece => {
                                    
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