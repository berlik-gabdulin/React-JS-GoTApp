import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import gotService from '../../services/gotService';

import CharacterPage from '../pages/characterPage';
import HousePage from '../pages/housePage';
import BookPage from '../pages/bookPage';

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
            <>
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
                    <CharacterPage />
                    <HousePage />
                    <BookPage />

                    
                </Container>
            </>
        );
    }
};