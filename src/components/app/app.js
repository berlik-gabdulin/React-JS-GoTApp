import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';

import GotService from '../../services/gotService';


const got = new GotService();

got.getAllCharacters()
    .then(res => {
        res.forEach( char => console.log(char.name))
    });

got.getCharacter(46)
    .then(res => console.log(res));

    //

got.getAllHouses()
    .then(res => {
        res.forEach( char => console.log(char.name))
    });
got.getHouse(12)
    .then(res => console.log(res));

    //

got.getAllBooks()
    .then(res => {
        res.forEach( char => console.log(char.name))
    });
got.getBook(7)
    .then(res => console.log(res));

const App = () => {
    return (
        <> 
            <Container>
                <Header />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        <RandomChar/>
                    </Col>
                </Row>
                <Row>
                    <Col md='6'>
                        <ItemList />
                    </Col>
                    <Col md='6'>
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default App;