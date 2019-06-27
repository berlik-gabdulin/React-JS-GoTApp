import React, { Component } from 'react';
import { Card, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {

    render() {

        return (
            <Card>
                <Container>
                    <h1>Oooops, something goes wrong...</h1>
                    <h3>Move along... move along...</h3>
                    <img src={process.env.PUBLIC_URL + '/img/404.jpg'} alt='404 page not found' />
                </Container>
                <Container>
                    <Button>
                        <Link to="/">Going home...</Link>
                    </Button>
                </Container>
            </Card>
        )
    }
}