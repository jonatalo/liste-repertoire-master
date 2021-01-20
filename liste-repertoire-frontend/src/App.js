import PageAccueil from './pages/PageAccueil';
import PageRepertoire from './pages/PageRepertoire';
import PageAdmin from './pages/PageAdmin';
import PageAjouter from './pages/PageAjouter';
import PageModifier from './pages/PageModifier';
import PageSupprimer from './pages/PageSupprimer';
import PageFormulaireConnection from './pages/PageFormulaireConnection';
import Page404 from './pages/Page404';
import PageEnvoyerDemande from './pages/PageEnvoyerDemande';
import PageListeDemandes from './pages/PageListeDemandes';
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

function App() {
  const [authentification,setAuthentification]=useState(0);
  return (
    <ContexteAuth.Provider value={{authentification,setAuthentification}} >
      <Router>
        <Container>
          <BarreNavigation />
          <Switch>
            <Route path="/" component={PageAccueil} exact />
            <Route path="/repertoire" component={PageRepertoire} />
            <Route path="/connection" component={PageFormulaireConnection} />
            <RoutePrivee path="/admin" component={PageAdmin} />
            <RoutePrivee path="/demande-speciale" component={PageEnvoyerDemande} />
            <Route path="/liste-demandes" component={PageListeDemandes} />
            <Route path="/ajouter" component={PageAjouter} />
            <Route path="/modifier/:id" component={PageModifier} />
            <Route path="/supprimer/:id" component={PageSupprimer} />
            <Route component={Page404} />
          </Switch>        
        </Container>
      </Router>
    </ContexteAuth.Provider>
  );
}

export default App;
