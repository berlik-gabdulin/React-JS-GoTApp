import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

import {CharacterPage, HousePage, BookPage, BooksItem} from '../pages';

import { BrowserRouter as Router, Route } from 'react-router-dom';

const MarginButton = styled(Button)`
    margin-bottom: 15px;
`

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        const { showRandomChar } = this.state;
        this.setState({
            showRandomChar: !showRandomChar,

        });
        // console.log(this.state.showRandomChar);
    }

    render() {
        const { showRandomChar } = this.state;
        const randomChar = showRandomChar ? <RandomChar /> : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {randomChar}
                                <MarginButton onClick={this.toggleRandomChar}>Toggle Random character</MarginButton>
                            </Col>
                        </Row>

                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousePage}/>
                        <Route path='/books' exact component={BookPage}/>
                        <Route path='/books/:id' render={
                            () => <BooksItem />
                        }/>

                    </Container>
                </div>
            </Router>
        );
    }
};