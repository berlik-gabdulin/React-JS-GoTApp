import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import styled from 'styled-components';
import gotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const CharDetailsWrap = styled.div`
    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    h4 {
        margin-bottom: 20px;
        text-align: center;
    }
`

const Field = ({ item, field, label }) => {
    return (
        <ListGroupItem className="d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{[field]}</span>
        </ListGroupItem>
    )
}
export {
    Field
}

export default class CharDetails extends Component {

    gotService = new gotService();

    state = {
        char: null,
        error: false,
        loading: true
    }

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar();
        }
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    updateChar() {
        const { charId } = this.props;
        if (!charId) {
            return;
        }

        this.setState({
            char: null,
            loading: true
        })

        this.gotService.getCharacter(charId)
            .then(this.onCharLoaded)
            .then((char) => {
                this.setState({
                    char,
                    loading: false,
                    // error: false
                })
            })
        // this.foo.bar = 0;
    }



    render() {

        const { char, loading, error } = this.state;

        console.log(char);

        const View = ({ char }) => {

            const { name, gender, born, died, culture } = char;
        
            return (
                <>
                    <h4>{name}</h4>
                    <ListGroup flush>
                        {this.props.children}
                    </ListGroup>
                </>
            )
        }

        const spinner = loading ? <Spinner /> : null;

        const errorMessage = error ? <ErrorMessage /> : null;

        const content = !(loading || error || !char) ? <View char={char} /> : null;

        return (
            <CharDetailsWrap className="rounded">
                {errorMessage}
                {spinner}
                {content}
            </CharDetailsWrap>
        );
    }
}


