import {
    React,
    useState
} from 'react';
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import {FaAngleUp } from "react-icons/fa";
import {FaAngleDown } from "react-icons/fa";
import {useTranslation} from 'react-i18next';

function DiviserParCategorie(pieceMusicales){
    const pieceConstruteur = {_id:"", tite:"",artiste:"",categories:""};
        var pieceMusicaleCategorie=[];
        pieceMusicales.forEach(piece =>{
            
 
            if(piece.categories.length == 1)
            {
                var pieceMusical =Object.create(pieceConstruteur);
                pieceMusical._id =piece._id;
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
                    pieceMusical._id =piece._id;
                    pieceMusical.titre = piece.titre;
                    pieceMusical.artiste = piece.artiste;                   
                    pieceMusical.categories=categories[index];                
                    pieceMusicaleCategorie.push(pieceMusical);
                }
            }
        })
        return pieceMusicaleCategorie;

}


function ListePiecesDemande({ pieces,  handleClick, listeDemandes }) {
    const {t} =useTranslation();
    const [CategorieTrie,setCategorieTrie]=useState("Rien");
    const [PieceTrie,setPieceTrie]=useState("Rien");
    const [NomArtisteTrie,setNomArtisteTrie]=useState("Rien");
    console.log(listeDemandes);
    if (listeDemandes !== undefined) {
        var listeIdDemandes = Object.keys(listeDemandes);
    } 
    console.log(listeIdDemandes);
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
                    {console.log(listeDemandes)}
                    <thead>
                        <tr>
                            <th>{t('titre')}
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setPieceTrie("Croissant")} ><FaAngleUp /></Button>
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setPieceTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>{t('artiste')}
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setNomArtisteTrie("Croissant")}><FaAngleUp /></Button>
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setNomArtisteTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>
                            <th>{t('categorie')}
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setCategorieTrie("Croissant")} ><FaAngleUp /></Button>
                                <Button variant="outline-secondary" className="m-1" size="sm" onClick={() => setCategorieTrie("Decroissant")} ><FaAngleDown/></Button>
                            </th>                             
                        </tr>
                    </thead>
                    <tbody>
                    {pieceMusicales.map(piece => {
                        if (handleClick != undefined) {
                                if(typeof (piece.categories)!="string"){
                                    if (listeIdDemandes.includes(piece._id)) {
                                    return(
                                    <>  
                                        <tr>  
                                        <td>{piece.titre}</td>
                                        <td>{piece.artiste}</td>
                                        <td>{piece.categories.map(categorie =>{
                                                return(
                                                    <>
                                                        <p>{categorie}</p>
                                                    </>
                                                );
                                            })}
                                        </td>
                                        <td>
                                        <Button variant="outline-info  " className="m-1" size="sm" onClick={() => handleClick(piece._id)}>{t('supprimer')}Sélectionner</Button>
                                        </td>
                                         </tr>
                                    </>
                                 );
                                } 
                                    else{
                                        return(
                                                <>  
                                                    <tr>  
                                                        <td>{piece.titre}</td>
                                                        <td>{piece.artiste}</td>
                                                        <td>
                                                            {piece.categories.map(categorie =>{
                                                                return(
                                                                    <>
                                                                        <p>{categorie}</p>
                                                                    </>
                                                                );
                                                            })}
                                                        </td>
                                                        <td>
                                                            <Button variant="outline-success" className="m-1" size="sm" onClick={() => handleClick(piece._id)}{t('ajouter')}></Button> 
                                                        </td>
                                                     </tr>
                                                </>
                                            );
                                        } 
                                    }                                      
                            else{   
                                if (listeIdDemandes.includes(piece._id)) {                  
                                    return(
                                        <>  
                                            <tr>  
                                                <td>{piece.titre}</td>
                                                <td>{piece.artiste}</td>
                                                <td>{piece.categories}</td>
                                                <td>
                                                    <Button variant="outline-info" className="m-1" size="sm" onClick={() => handleClick(piece._id)}>{t('selectionner')}</Button>
                                                </td>
                                             </tr>
                                        </>
                                    );
                                }
                                    
                                else{
                                    return(
                                            <>  
                                                <tr>  
                                                <td>{piece.titre}</td>
                                                <td>{piece.artiste}</td>
                                                <td>{piece.categories}</td>
                                                <td><Button variant="outline-success" className="m-1" size="sm" onClick={() => handleClick(piece._id)}>{t('ajouter')}</Button></td>
                                                 </tr>
                                            </>
                                    );
                                    }  
                            } 
                        } 
                    }
                )
                }  

                    </tbody>
                </Table>
            </>
        );
    }
    else {
        return <Alert variant={"info"} >{t('messagerepertoirevide')}</Alert>;
    }
    
}

export default ListePiecesDemande;