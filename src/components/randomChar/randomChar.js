import React, {Component} from 'react';
// import './randomChar.css';

import {ListGroup, ListGroupItem} from 'reactstrap';
import styled from 'styled-components';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`
const Term = styled.span`
    font-weight: bold;
`


export default class RandomChar extends Component {

    render() {

        return (
            <RandomBlock className="rounded">
                <h4>Random Character: John</h4>
                <ListGroup flush>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>male</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Born </Term>
                        <span>11.03.1039</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Died </Term>
                        <span>13.09.1089</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <Term>Culture </Term>
                        <span>Anarchy</span>
                    </ListGroupItem>
                </ListGroup>
            </RandomBlock>
        );
    }
}
