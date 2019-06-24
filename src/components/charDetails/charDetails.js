import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from 'reactstrap';
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
        const {charId} = this.props;
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

const View = ({char}) => {
    
    const {name, gender, born, died, culture} = char;

    return (
        <>
            <h4>{name}</h4>
                <ListGroup flush>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Gender</span>
                        {/* <span>{this.gender}</span> Раскомментировать для вызова ошибки  */}
                        <span>{gender}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Born</span>
                        <span>{born}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Died</span>
                        <span>{died}</span>
                    </ListGroupItem>
                    <ListGroupItem className="d-flex justify-content-between">
                        <span className="term">Culture</span>
                        <span>{culture}</span>
                    </ListGroupItem>
                </ListGroup>
        </>
    )
}
