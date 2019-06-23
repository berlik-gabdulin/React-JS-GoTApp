import React, { Component } from 'react';
import { Col, Row, Container, Button } from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';

import CharacterPage from '../characterPage';

const MarginButton = styled(Button)`
    margin-bottom: 15px;
`

export default class App extends Component {

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
            return <ErrorMessage/>
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
                </Container>
            </>
        );
    }
};