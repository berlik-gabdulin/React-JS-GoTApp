import React, { Component } from 'react';
import ItemDetails, {Field} from '../itemDetails';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
// import './randomChar.css';

import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';

const RandomBlock = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
    img {
        display: block;
        margin: 10px auto;
        max-width: 100%;
        
    }
`
const Term = styled.span`
    font-weight: bold;
`

export default class RandomChar extends Component {

    gotService = new gotService();

    state = {
        char: {},
        loading: true,
        charVisible: true
    }

    componentDidMount() {
        console.log('mounting');
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 2000);
    }

    componentWillUnmount() {
        console.log('unmounting');
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }


    updateChar = () => {
        const id = Math.floor(Math.random() * 3000 + 25); // 25-140
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render() {
        console.log('render');

        const {char, error, loading} = this.state;

        const itemDetails = (
            <ItemDetails 
            getData={this.gotService.getCharacter}
            itemId={this.state.char.key}
            itemMessage={"wait"}>
                <Field field='gender' label='Gender'/>
                <Field field='born' label='Born'/>
                <Field field='died' label='Died'/>
                <Field field='culture' label='Culture'/>
            </ItemDetails>
        )
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;
        const content = !(loading || error || !char) ? itemDetails : null;

        return (
            <>
                {spinner}
                {errorMessage}
                {content}
            </>
        );
    }
}