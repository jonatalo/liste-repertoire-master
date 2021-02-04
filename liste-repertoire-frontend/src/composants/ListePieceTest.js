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

function DiviserParCategorie(pieceMusicales){
    const pieceConstruteur = {tite:"",artiste:"",categories:""};
        var pieceMusicaleCategorie=[];
        pieceMusicales.forEach(piece =>{
            
 
            if(piece.categories.length == 1)
            {
                var pieceMusical =Object.create(pieceConstruteur);
                pieceMusical.titre = piece.titre;
                pieceMusical.artiste = piece.artiste;
                pieceMusical.categories=piece.categories[0];
                pieceMusicaleCategorie.push(pieceMusical);
            }
            else if(piece.categories.length > 1)
            {
               
                var categories=[];
                
                piece.categories.forEach(categorie=>{
                    categories.push(categorie);
                    
                });
                for (let index = 0; index < categories.length; index++) {
                    var pieceMusical =Object.create(pieceConstruteur);
                    pieceMusical.titre = piece.titre;
                    pieceMusical.artiste = piece.artiste;                   
                    pieceMusical.categories=categories[index];                
                    pieceMusicaleCategorie.push(pieceMusical);
                }
            }
            
        })
        return pieceMusicaleCategorie;

}


function ListePieceTest({ pieces,  handleClick, listeDemandes }) {
    const [CategorieTrie,setCategorieTrie]=useState("Rien");
    const [PieceTrie,setPieceTrie]=useState("Rien");
    const [NomArtisteTrie,setNomArtisteTrie]=useState("Rien");
    
     if (pieces?.length) {
         var pieceMusicales=pieces;
        if(CategorieTrie == "Croissant")
        {
            var pieceMusicales=pieces;
            pieceMusicales = DiviserParCategorie(pieceMusicales);            
            pieceMusicales = pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.categories.toLowerCase().localeCompare(pieceB.categories.toLowerCase())
            );
            
         }
         else if (CategorieTrie == "Decroissant")
         {
            var pieceMusicales=pieces;
            pieceMusicales = DiviserParCategorie(pieceMusicales);            
            pieceMusicales = pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.categories.toLowerCase().localeCompare(pieceB.categories.toLowerCase())*-1 
            );
            
         }
        if(NomArtisteTrie == "Croissant")
        {
            setCategorieTrie("Rien")
            var pieceMusicales=pieces;
            pieceMusicales = pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.artiste.toLowerCase().localeCompare(pieceB.artiste.toLowerCase()) 
                );
                setNomArtisteTrie("rien");
           
        }
        else if (NomArtisteTrie == "Decroissant")
        {   
            
            setCategorieTrie("Rien")
            var pieceMusicales=pieces;
            pieceMusicales = (pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.artiste.toLowerCase().localeCompare(pieceB.artiste.toLowerCase())*-1 
                ));
                setNomArtisteTrie("rien");
        }
        if(PieceTrie == "Croissant")
        {
            setCategorieTrie("Rien")
            var pieceMusicales=pieces;
            pieceMusicales = pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.titre.toLowerCase().localeCompare(pieceB.titre.toLowerCase()) 
                );
                setPieceTrie("Rien");
        }
        else if (PieceTrie == "Decroissant")
        {
            setCategorieTrie("Rien")
            var pieceMusicales=pieces;
            console.log(pieceMusicales)
            pieceMusicales = pieces;
            pieceMusicales= pieceMusicales.sort((pieceA, pieceB) => 
                pieceA.titre.toLowerCase().localeCompare(pieceB.titre.toLowerCase())*-1 
                );// sort une function lamda
                setPieceTrie("Rien");
        }
        return (
            <> 
                <Table className="table table-bordered">
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
                    {pieceMusicales.map(piece => {
                        if(typeof (piece.categories)!="string"){
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
                    }
                    } 

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

export default ListePieceTest;