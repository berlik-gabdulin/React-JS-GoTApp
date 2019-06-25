import React, { Component } from 'react';
import { Col, Row, Alert } from 'reactstrap';
import ItemList from '../itemList';
import CharDetails, {Field} from '../charDetails';
import gotService from '../../services/gotService';
// import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import RowBlock from '../rowBlock';

export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: 130,
        error: false
    }

    onItemSelected = (id) => {
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

        const { selectedChar, error } = this.state;

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        )
        const charDetails = (
            <CharDetails charId={this.state.selectedChar}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
            </CharDetails>
        )
        const errorMessage = (
            <Alert color="light" className="select-error">Please select a character</Alert>
        )
        const itemSelectList = error ? errorMessage : itemList;

        const selectChar = !selectedChar ? errorMessage : charDetails;

        if (this.state.error) {
            return <ErrorMessage />
        }

        return (
            <RowBlock left={itemSelectList} right={charDetails} />
        )
    }
}