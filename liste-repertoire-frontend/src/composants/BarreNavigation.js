import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {useTranslation} from 'react-i18next';


function BarreNavigation() {
    const {t} =useTranslation();
    return (
        <Navbar bg="light" expand="sm">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <LinkContainer to="/" exact>
                        <Nav.Link>{t('accueil')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/repertoire">
                        <Nav.Link>{t('repertoire')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/connection">
                        <Nav.Link >{t('connection')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/demande-speciale">
                        <Nav.Link>{t('demandesspéciales')}</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/admin">
                        <Nav.Link >{t('admin')}</Nav.Link>
                    </LinkContainer>

                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default BarreNavigation;