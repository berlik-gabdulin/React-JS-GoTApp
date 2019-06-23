import React, { Component } from 'react';
import { Col, Row, Alert } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
// import styled from 'styled-components';
import ErrorMessage from '../errorMessage';


export default class CharacterPage extends Component {

    state = {
        selectedChar: null,
        error: false
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {

        const { selectedChar } = this.state;

        const selectChar = !selectedChar ? <SelectErrorMessage /> : <CharDetails charId={this.state.selectedChar} />;
        // const charDetails =  : null;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (

            <Row>
                <Col md='6'>
                    <ItemList onCharSelected={this.onCharSelected} />
                </Col>
                <Col md='6'>
                    {selectChar}
                </Col>
            </Row>
        )
    }
}

const SelectErrorMessage = () => {
    return (
        <Alert color="light" className="select-error">Please select a character</Alert>
    )
}