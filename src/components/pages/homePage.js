import React, { Component } from 'react';
import { Card, Container } from 'reactstrap';

export default class HomePage extends Component {

    render() {

        return (
            <Card>
                <Container>
                    <h1>Hello, world!!!</h1>
                    <h3>Welcome to the small GameOfThrones Data Base</h3>
                    <p>It's using "An API of Ice And Fire - All the data from the universe of Ice And Fire you've ever wanted!" just for study and have fun!</p>
                </Container>
            </Card>
        )
    }
}