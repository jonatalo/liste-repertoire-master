import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import PageFormulaireConnection from './pages/PageFormulaireConnection';
import PageConnexionNouveauUtilisateur from './pages/PageConnexionNouveauUtilisateur';
import Page404 from './pages/Page404';
import PageEnvoyerDemande from './pages/PageEnvoyerDemande';
import PageListeDemandes from './pages/PageListeDemandes';
import PageListeDemandesUtilisateur from './pages/PageListeDemandesUtilisateur';
import BarreNavigation from './composants/BarreNavigation';
import RoutePrivee from './composants/RoutePrivee';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { ContexteAuth } from './context/auth';
import { useState } from 'react';
import PageTest from './pages/PageTest';

function App() {
  const [authentification,setAuthentification]=useState(0);
  const [nom,setNom]=useState('user');
  return (
    <ContexteAuth.Provider value={{authentification,setAuthentification,nom,setNom}} >
      <Router>
        <Container>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <Route path="/connection" component={PageFormulaireConnection} />
            <Route path="/NouveauUtilisateur" component={PageConnexionNouveauUtilisateur}/>
            <RoutePrivee path="/admin" component={PageAdmin} />
            <RoutePrivee path="/demande-speciale" component={PageEnvoyerDemande} />
            <Route path="/liste-demandes" component={PageListeDemandes} />
            <Route path="/liste-demandes-utilisateur" component={PageListeDemandesUtilisateur} />
            <Route path="/ajouter" component={PageAjouter} />
            <Route path="/modifier/:id" component={PageModifier} />
            <Route path="/supprimer/:id" component={PageSupprimer} />
            <Route path="/test" component={PageTest} />
            <Route component={Page404} />
          </Switch>        
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
